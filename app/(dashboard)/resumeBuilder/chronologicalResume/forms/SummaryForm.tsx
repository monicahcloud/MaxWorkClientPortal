"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import { toast } from "sonner";
import { AIchatSession } from "@/utils/AIModal";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onComplete: () => void;
  resumeId: string;
}

const promptTemplate =
  "JobTitle: {jobTitle}, Depends on job title give me summary for my resume within 4-5 lines. Give me the response in this format: { entry: 'entry level summary', mid: 'mid level summary', expert: 'expert level summary'}";

const SummaryForm: React.FC<Props> = ({ onComplete, resumeId }) => {
  const { summary, setSummary, personalInfo } = useResumeBuilder();
  const [loading, setLoading] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [summaryOptions, setSummaryOptions] = useState<{
    entry: string;
    mid: string;
    expert: string;
  } | null>(null);

  useEffect(() => {
    if (typeof summary === "string") {
      setSummaryText(summary);
    } else if (summary && typeof summary === "object" && summary.text) {
      setSummaryText(summary.text);
    }
  }, [summary]);

  const handleSave = async () => {
    if (!resumeId) {
      toast.error("Missing resume ID");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/resume/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeId, content: { text: summaryText } }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Summary saved successfully!");
      setSummary({ text: summaryText });
      onComplete();
    } else {
      toast.error(data.error || "Failed to save summary.");
    }

    setLoading(false);
  };

  const generateFromAI = async () => {
    if (!personalInfo?.jobTitle) {
      toast.error("Please enter a job title first");
      return;
    }

    setLoading(true);

    const prompt = promptTemplate.replace("{jobTitle}", personalInfo.jobTitle);

    try {
      const result = await AIchatSession.sendMessage(prompt);
      const parsedData = JSON.parse(result.response.text());
      setSummaryOptions(parsedData);
    } catch (error) {
      console.error("AI Summary Error:", error);
      toast.error("Failed to generate summary from AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border-t-4 border-blue-600 bg-gray-50 rounded-md shadow">
      <h2 className="text-xl font-bold mb-2 uppercase">Professional Summary</h2>

      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          type="button"
          size="sm"
          onClick={generateFromAI}
          disabled={loading}
          className="border-primary text-primary flex gap-2">
          {loading ? (
            <LoaderCircle className="animate-spin w-4 h-4" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
          {loading ? "Generating..." : "Generate from AI"}
        </Button>
      </div>

      <Textarea
        placeholder="Briefly describe your background, experience, and goals..."
        rows={6}
        value={summaryText}
        onChange={(e) => {
          setSummaryText(e.target.value);
          setSummary({ text: e.target.value }); // Live update context
        }}
      />

      {summaryOptions && (
        <div className="mt-4 space-y-3">
          <h3 className="text-sm font-medium text-blue-700">
            Gemini AI Suggestions
          </h3>
          <div className="grid gap-3">
            {Object.entries(summaryOptions).map(([level, text]) => (
              <div
                key={uuidv4()}
                className="bg-white rounded-md p-4 shadow-md transition hover:shadow-lg cursor-pointer"
                onClick={() => {
                  setSummaryText(text);
                  setSummary({ text });
                }}>
                <h4 className="text-sm font-semibold capitalize mb-2">
                  {level} Level
                </h4>
                <p className="text-sm text-gray-800 whitespace-pre-line">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <Button type="button" onClick={handleSave} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default SummaryForm;
