"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import { toast } from "sonner";

interface Props {
  onComplete: () => void;
}

const Summary: React.FC<Props> = ({ onComplete }) => {
  const { summary, setSummary } = useResumeBuilder();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [summaryOptions, setSummaryOptions] = useState<{
    entry: string;
    mid: string;
    expert: string;
  } | null>(null);

  const resumeId = new URLSearchParams(window.location.search).get("resumeId");

  const handleSave = async () => {
    if (!resumeId) {
      toast.error("Missing resume ID");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/resume/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeId, content: summary }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Summary saved successfully!");
      onComplete();
    } else {
      toast.error(data.error || "Failed to save summary.");
    }

    setLoading(false);
  };

  const generateWithAI = async () => {
    if (!resumeId) {
      toast.error("Missing resume ID");
      return;
    }

    setGenerating(true);

    try {
      const res = await fetch("/api/resume/summary/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      });

      const data = await res.json();
      const content: string = data.fullResponse;

      const entry = content
        .match(/Entry[- ]?Level:?(.+?)Mid[- ]?Level:/s)?.[1]
        ?.trim();
      const mid = content
        .match(/Mid[- ]?Level:?(.+?)Expert[- ]?Level:/s)?.[1]
        ?.trim();
      const expert = content.match(/Expert[- ]?Level:?(.+)/s)?.[1]?.trim();

      setSummaryOptions({
        entry: entry ?? "Entry-level summary not found.",
        mid: mid ?? "Mid-level summary not found.",
        expert: expert ?? "Expert-level summary not found.",
      });

      if (!entry || !mid || !expert) {
        toast.warning(
          "Some summary levels couldn't be generated. Please review them."
        );
      }
    } catch (err) {
      toast.error("Failed to generate summary.");
      console.error("AI error:", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-6 border-t-4 border-blue-600 bg-gray-50 rounded-md shadow">
      <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>

      <div className="flex justify-end items-end mb-5">
        <Button
          variant="outline"
          type="button"
          size="sm"
          disabled={generating}
          onClick={generateWithAI}
          className="border-primary text-primary flex gap-2">
          {generating ? (
            <LoaderCircle className="animate-spin w-4 h-4" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
          {generating ? "Generating..." : "Generate from AI"}
        </Button>
      </div>

      <Textarea
        placeholder="Briefly describe your background, experience, and goals..."
        rows={6}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      {summaryOptions && (
        <div className="mt-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">AI Suggestions</h3>
          <div className="grid gap-3">
            {Object.entries(summaryOptions).map(([label, text]) => (
              <div
                key={label}
                className="border p-3 rounded-md bg-white hover:bg-gray-50 cursor-pointer transition"
                onClick={async () => {
                  setSummary(text);

                  try {
                    const res = await fetch("/api/resume/summary", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ resumeId, content: text }),
                    });

                    if (res.ok) {
                      toast.success(`${label} summary saved to resume!`);
                    } else {
                      const data = await res.json();
                      toast.error(data.error || "Failed to save summary.");
                    }
                  } catch (err) {
                    console.error(err);
                    toast.error("Error saving summary.");
                  }
                }}>
                <p className="text-xs text-gray-500 capitalize mb-1">
                  {label} Level
                </p>
                <p className="text-sm text-gray-800 whitespace-pre-line">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Summary;
