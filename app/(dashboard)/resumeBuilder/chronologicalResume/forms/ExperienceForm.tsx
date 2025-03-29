"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { AIchatSession } from "@/utils/AIModal";
import { v4 as uuidv4 } from "uuid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Brain, LoaderCircle } from "lucide-react";
import {
  useResumeBuilder,
  Experience as ExperienceType,
} from "@/app/context/ResumeBuilderContext";
import { toast } from "sonner";

interface ExperienceFormProps {
  experience: ExperienceType;
  index: number;
  onChange: (index: number, updated: ExperienceType) => void;
  onRemove: (index: number) => void;
  generateAI: (index: number) => void;
  loading: boolean;
}

interface Props {
  onComplete: () => void;
  resumeId: string;
}

function ExperienceForm({
  experience,
  index,
  onChange,
  onRemove,
  generateAI,
  loading,
}: ExperienceFormProps) {
  const [isPresent, setIsPresent] = useState(false);
  const { experiences } = useResumeBuilder();

  // This pulls the latest version from context (not the stale prop)
  const currentExperience = experiences[index] || experience;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(index, { ...currentExperience, [name]: value });
  };

  const handleStartDateChange = (date: Date | undefined) => {
    onChange(index, { ...currentExperience, startDate: date });
  };

  const handleEndDateChange = (date: Date | undefined) => {
    onChange(index, { ...currentExperience, endDate: date });
  };

  const handleDutiesChange = (value: string) => {
    onChange(index, { ...currentExperience, duties: value });
  };

  return (
    <div className="border p-4 rounded-md mt-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-2 uppercase">
          Experience #{index + 1}
        </h2>
        <Button variant="destructive" size="sm" onClick={() => onRemove(index)}>
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <Label>Job Title</Label>
          <Input
            name="role"
            value={currentExperience.role}
            onChange={handleInputChange}
          />

          <Label className="mt-3">Organization, Location</Label>
          <Input
            type="text"
            name="company"
            value={currentExperience.company}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-2">
          <div className="w-1/2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !currentExperience.startDate && "text-muted-foreground"
                  )}>
                  {currentExperience.startDate
                    ? format(new Date(currentExperience.startDate), "PPP")
                    : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    currentExperience.startDate
                      ? new Date(currentExperience.startDate)
                      : undefined
                  }
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-1/2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !currentExperience.endDate && "text-muted-foreground"
                  )}>
                  {currentExperience.endDate
                    ? format(new Date(currentExperience.endDate), "PPP")
                    : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    currentExperience.endDate
                      ? new Date(currentExperience.endDate)
                      : undefined
                  }
                  onSelect={handleEndDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-end mb-5">
        <Button
          variant="outline"
          type="button"
          size="sm"
          disabled={loading}
          onClick={() => generateAI(index)}
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
        placeholder="Briefly describe your duties..."
        rows={6}
        value={currentExperience.duties || ""}
        onChange={(e) => handleDutiesChange(e.target.value)}
      />
    </div>
  );
}

interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
}

const promptTemplate =
  "JobTitle: ${experiences[index].role}: depends on positionTitle provide a DETAILED discussion of duties and responsibilities. Be honest but don’t be humble.";

const InputField = ({
  name,
  label,
  value,
  onChange,
  className = "",
}: InputFieldProps) => (
  <div className={className}>
    <Label>{label}</Label>
    <Input name={name} value={value} onChange={onChange} />
  </div>
);

const Experience = ({ onComplete, resumeId }: Props) => {
  const { experiences, setExperiences } = useResumeBuilder();
  const [loading, setLoading] = useState(false);
  const [selectedAIExperience, setSelectedAIExperience] = useState<
    number | null
  >(null);
  const [aiOptions, setAIOptions] = useState<{
    index: number;
    duties: string[];
  } | null>(null);

  const handleExperienceChange = (index: number, updated: ExperienceType) => {
    setExperiences((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, ...updated } : exp))
    );
  };

  const handleSaveExperiences = async () => {
    if (!resumeId) return toast.error("Resume ID is missing.");

    try {
      const res = await fetch("/api/resume/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experiences: experiences.map((exp) => ({
            ...exp,
            resumeId,
          })),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save experiences");
      }

      toast.success("Experiences saved successfully");
      onComplete();
    } catch (error: any) {
      toast.error(error.message || "Error saving experiences");
    }
  };

  const generateFromAI = async (index: number) => {
    const exp = experiences[index];
    if (!exp.role) return toast.error("Please enter a job title first");

    setLoading(true);
    setSelectedAIExperience(index);

    const prompt = `Provide 4-5 detailed job duties in bullet form for the role: ${exp.role}`;

    try {
      const result = await AIchatSession.sendMessage(prompt);
      const data = JSON.parse(result.response.text());

      let duties: string[] = [];
      if (Array.isArray(data)) {
        duties = data.map((d) => (typeof d === "string" ? d : d.job_duty));
      } else if (Array.isArray(data.job_duties)) {
        duties = data.job_duties;
      }

      setAIOptions({ index, duties });
    } catch (error) {
      console.error("AI Error:", error);
      toast.error("Failed to generate duties from AI");
    } finally {
      setLoading(false);
      setSelectedAIExperience(null);
    }
  };

  const applyAIDuty = (index: number, duty: string) => {
    const current = experiences[index].duties || "";
    const newDuties = `${current}\n- ${duty}`.trim();
    handleExperienceChange(index, { ...experiences[index], duties: newDuties });
  };

  return (
    <div className="p-6 border-t-4 border-blue-600 bg-gray-50 rounded-md shadow">
      <h2 className="text-xl font-bold mb-2 uppercase">Experience</h2>

      {experiences.map((exp, index) => (
        <div
          key={exp.id || index}
          className="bg-white p-4 my-4 rounded-md shadow">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Job #{index + 1}</h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                setExperiences((prev) => prev.filter((_, i) => i !== index))
              }>
              Remove
            </Button>
          </div>

          <Label className="mt-4">Job Title</Label>
          <Input
            name="role"
            value={exp.role}
            onChange={(e) =>
              handleExperienceChange(index, { ...exp, role: e.target.value })
            }
          />

          <Label className="mt-4">Company</Label>
          <Input
            name="company"
            value={exp.company}
            onChange={(e) =>
              handleExperienceChange(index, { ...exp, company: e.target.value })
            }
          />

          <div className="flex gap-2 mt-4">
            <div className="w-1/2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {exp.startDate
                      ? format(new Date(exp.startDate), "PPP")
                      : "Pick a date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      exp.startDate ? new Date(exp.startDate) : undefined
                    }
                    onSelect={(date) =>
                      handleExperienceChange(index, { ...exp, startDate: date })
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-1/2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {exp.endDate
                      ? format(new Date(exp.endDate), "PPP")
                      : "Pick a date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={exp.endDate ? new Date(exp.endDate) : undefined}
                    onSelect={(date) =>
                      handleExperienceChange(index, { ...exp, endDate: date })
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={loading && selectedAIExperience === index}
              onClick={() => generateFromAI(index)}
              className="border-primary text-primary flex gap-2">
              {loading && selectedAIExperience === index ? (
                <LoaderCircle className="animate-spin w-4 h-4" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
              {loading && selectedAIExperience === index
                ? "Generating..."
                : "Generate from AI"}
            </Button>
          </div>

          <Textarea
            className="mt-4"
            placeholder="Add job duties here..."
            rows={6}
            value={exp.duties}
            onChange={(e) =>
              handleExperienceChange(index, { ...exp, duties: e.target.value })
            }
          />

          {aiOptions && aiOptions.index === index && (
            <div className="mt-3 bg-gray-100 rounded p-3">
              <h4 className="font-medium text-sm mb-2 text-blue-700">
                Gemini AI Suggestions
              </h4>
              <div className="grid gap-2">
                {aiOptions.duties.map((duty, i) => (
                  <div
                    key={i}
                    className="bg-white p-2 rounded shadow hover:bg-blue-50 cursor-pointer"
                    onClick={() => applyAIDuty(index, duty)}>
                    <p className="text-xs text-gray-800">- {duty}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={() =>
            setExperiences((prev) => [
              ...prev,
              {
                id: uuidv4(),
                company: "",
                role: "",
                startDate: undefined,
                endDate: undefined,
                duties: "",
                responsibilities: "",
                accomplishments: "",
                clearance: "",
                status: "",
                grade: "",
                time: "",
                resumeId,
              },
            ])
          }>
          + Add Experience
        </Button>
        <Button onClick={handleSaveExperiences}>Save</Button>
      </div>
    </div>
  );
};

export default Experience;
