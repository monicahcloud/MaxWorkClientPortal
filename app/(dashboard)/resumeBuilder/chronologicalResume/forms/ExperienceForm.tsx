"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { AIchatSession } from "@/utils/AIModal";

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(index, { ...experience, [name]: value });
  };

  const handleStartDateChange = (date: Date | undefined) => {
    onChange(index, { ...experience, startDate: date });
  };

  const handleEndDateChange = (date: Date | undefined) => {
    onChange(index, { ...experience, endDate: date });
  };

  const handleDutiesChange = (value: string) => {
    onChange(index, { ...experience, duties: value });
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
            value={experience.role}
            onChange={handleInputChange}
          />

          <Label className="mt-3">Organization, Location</Label>
          <Input
            type="text"
            name="company"
            value={experience.company}
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
                    !experience.startDate && "text-muted-foreground"
                  )}>
                  {experience.startDate
                    ? format(new Date(experience.startDate), "PPP")
                    : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    experience.startDate
                      ? new Date(experience.startDate)
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
                    !experience.endDate && "text-muted-foreground"
                  )}>
                  {experience.endDate
                    ? format(new Date(experience.endDate), "PPP")
                    : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    experience.endDate
                      ? new Date(experience.endDate)
                      : undefined
                  }
                  onSelect={handleEndDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="flex items-center mt-2">
              <Checkbox
                id="present"
                checked={isPresent}
                onCheckedChange={(checked) => setIsPresent(checked === true)}
              />
              <Label className="ml-2 text-sm font-medium">Present</Label>
            </div>
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
        value={experience.duties}
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

function Experience({ onComplete, resumeId }: Props) {
  const { experiences, setExperiences } = useResumeBuilder();
  const [loading, setLoading] = useState(false);

  const handleExperienceChange = (index: number, updated: ExperienceType) => {
    setExperiences((prevExperiences) => {
      const updatedExperiences = prevExperiences.map((exp, i) => {
        if (i === index) {
          return { ...exp, ...updated };
        }
        return exp;
      });
      return updatedExperiences;
    });
  };

  const AddNewExperience = () => {
    setExperiences([
      ...experiences,
      {
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
      },
    ]);
  };

  const RemoveExperience = (indexToRemove: number) => {
    setExperiences(experiences.filter((_, index) => index !== indexToRemove));
  };

  const handleSaveExperiences = async () => {
    try {
      const resumeId = new URLSearchParams(window.location.search).get(
        "resumeId"
      );
      const experiencesWithResumeId = experiences.map((exp) => ({
        ...exp,
        resumeId: resumeId, // Add resumeId to each experience
      }));
      const res = await fetch("/api/resume/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experiences: experiencesWithResumeId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      toast.success("Experience saved successfully!");
      if (onComplete) {
        // Call onComplete if it exists
        onComplete();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save experience.");
    }
  };

  const GenerateSummaryFromAI = async (index: number) => {
    if (!experiences[index].role) {
      toast.error("Please enter a role first");
      return;
    }
    setLoading(true);

    const prompt = `Provide a list of job duties in bullet point form for the role: ${experiences[index].role}`;

    try {
      const result = await AIchatSession.sendMessage(prompt);
      const parsedDataString = result.response.text();
      console.log("AI Response String:", parsedDataString);

      try {
        const parsedData = JSON.parse(parsedDataString);

        if (Array.isArray(parsedData) && parsedData.length > 0) {
          const firstItem = parsedData[0] as any;
          const jobDuties = firstItem?.job_duties;

          if (Array.isArray(jobDuties) && jobDuties.length > 0) {
            const dutiesText = jobDuties
              .map((duty: string) => `- ${duty}`)
              .join("\n");
            handleExperienceChange(index, {
              ...experiences[index],
              duties: dutiesText,
            });
          } else {
            console.error("AI did not return a valid list of duties.", {
              jobDuties,
            });
            toast.error("AI did not return a valid list of duties.");
          }
        } else {
          console.error("AI did not return a list of duties.", { parsedData });
          toast.error("AI did not return a list of duties.");
        }
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        toast.error("Failed to parse AI response.");
      }
    } catch (error) {
      console.error("Error generating duties:", error);
      toast.error("Failed to generate duties from AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-t-4 border-blue-600 bg-gray-50 rounded-md shadow">
      <h1 className="text-2xl font-bold">Experience</h1>

      {experiences.map((exp, index) => {
        console.log("Experience Data before render", exp);
        return (
          <ExperienceForm
            key={index}
            experience={exp}
            index={index}
            onChange={handleExperienceChange}
            onRemove={RemoveExperience}
            generateAI={() => GenerateSummaryFromAI(index)}
            loading={loading}
          />
        );
      })}

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={AddNewExperience}>
          + Add Experience
        </Button>
        <Button onClick={handleSaveExperiences}>Save</Button>
      </div>
    </div>
  );
}

export default Experience;
