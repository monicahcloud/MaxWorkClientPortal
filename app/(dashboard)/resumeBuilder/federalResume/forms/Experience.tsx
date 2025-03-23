"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  useResumeBuilder,
  Experience as ExperienceType,
} from "@/app/context/ResumeBuilderContext";
import { Checkbox } from "@/components/ui/checkbox";
import RichTextEditor from "@/app/components/global/RichTextEditor";
import { toast } from "sonner";
import { AIchatSession } from "@/utils/AIModal";

// ExperienceForm.tsx
interface ExperienceFormProps {
  experience: ExperienceType;
  index: number;
  onChange: (index: number, updated: ExperienceType) => void;
  onRemove: (index: number) => void;
  generateAI: (type: string) => void;
  loading: boolean;
}
interface Props {
  onComplete: () => void;
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

  const handleRichTextEditor = (value: string, field: keyof ExperienceType) => {
    onChange(index, { ...experience, [field]: value });
  };

  return (
    <div className="border p-4 rounded-md mt-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold mb-2 uppercase">
          Experience #{index + 1}
        </h2>
        <Button variant="destructive" size="sm" onClick={() => onRemove(index)}>
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Branch of Service, Program or Command</Label>
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
                    ? format(experience.startDate, "PPP")
                    : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={experience.startDate}
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
                    ? format(experience.endDate, "PPP")
                    : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={experience.endDate}
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <InputField
          name="grade"
          label="Grade"
          value={experience.grade}
          onChange={handleInputChange}
        />
        <InputField
          name="status"
          label="Job Series"
          value={experience.status}
          onChange={handleInputChange}
        />
        <InputField
          name="time"
          label="Work Schedule"
          value={experience.time}
          onChange={handleInputChange}
        />
        <InputField
          name="clearance"
          label="Clearance"
          value={experience.clearance}
          onChange={handleInputChange}
        />
      </div>

      <InputField
        name="role"
        label="Title or Command"
        value={experience.role}
        onChange={handleInputChange}
        className="mt-2"
      />

      <EditorField
        label="Duties"
        value={experience.duties}
        onChange={(v: string) => handleRichTextEditor(v, "duties")}
        generateAI={generateAI}
        loading={loading}
        type="duties"
      />
      <EditorField
        label="Responsibilities"
        value={experience.responsibilities}
        onChange={(v: string) => handleRichTextEditor(v, "responsibilities")}
        generateAI={generateAI}
        loading={loading}
        type="responsibilities"
      />
      <EditorField
        label="Key Accomplishments"
        value={experience.accomplishments}
        onChange={(v: string) => handleRichTextEditor(v, "accomplishments")}
        generateAI={generateAI}
        loading={loading}
        type="accomplishments"
      />
    </div>
  );
}

// Subcomponents
interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
}

const InputField = ({
  name,
  label,
  value,
  onChange,
  className = "",
}: InputFieldProps) => {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <Input name={name} value={value} onChange={onChange} />
    </div>
  );
};

interface EditorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  generateAI: (type: string) => void;
  loading: boolean;
  type: string;
}

const EditorField = ({
  label,
  value,
  onChange,
  generateAI,
  loading,
  type,
}: EditorFieldProps) => {
  console.log(`EditorField ${type} value:`, value); // Add this line
  return (
    <div className="mt-2">
      <Label>{label}</Label>
      <RichTextEditor
        onRichTextEditorChange={onChange}
        generateAI={generateAI}
        loading={loading}
        type={type}
        value={value} // Pass the value prop to RichTextEditor
      />
    </div>
  );
};

function Experience({ onComplete }: Props) {
  const { experiences, setExperiences } = useResumeBuilder();
  const [loading, setLoading] = useState(false);

  const handleExperienceChange = (index: number, updated: ExperienceType) => {
    console.log("handleExperienceChange index", index);
    console.log("handleExperienceChange updated", updated);
    setExperiences((prevExperiences) => {
      const updatedExperiences = prevExperiences.map((exp, i) => {
        if (i === index) {
          return { ...exp, ...updated };
        }
        return exp;
      });
      console.log("updatedExperiences", updatedExperiences);
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

  const GenerateSummaryFromAI = async (type: string, index: number) => {
    setLoading(true);
    if (!experiences[index].role) {
      toast.error("Please enter a role first");
      setLoading(false);
      return;
    }

    let promptToUse = "";
    if (type === "duties") {
      promptToUse = `positionTitle: ${experiences[index].role}: depends on positionTitle provide a DETAILED discussion of duties. Be honest but don’t be humble.`;
    } else if (type === "responsibilities") {
      promptToUse = `positionTitle: ${experiences[index].role}: depends on positionTitle provide a DETAILED discussion of responsibilities. Be honest but don’t be humble.`;
    } else if (type === "accomplishments") {
      promptToUse = `positionTitle: ${experiences[index].role}: depends on positionTitle provide a SUBSTANTIVE explanations of your achievements:`;
    }

    try {
      const result = await AIchatSession.sendMessage(promptToUse);
      const rawResponse = result.response.text();
      console.log("Raw AI Response:", rawResponse);
      const parsedData = JSON.parse(rawResponse);
      console.log("Parsed AI Response:", parsedData);

      if (Array.isArray(parsedData) && parsedData.length > 0) {
        const responseObject = parsedData[0]; // Extract the object from the array

        if (typeof responseObject === "object" && responseObject !== null) {
          if (responseObject[type]) {
            const contentString = responseObject[type].join("\n"); // Join array of strings into a single string
            handleExperienceChange(index, {
              ...experiences[index],
              [type]: contentString,
            });
          } else {
            toast.error("AI did not return a summary for this role and type.");
          }
        } else {
          console.error("AI response is not an object:", responseObject);
          toast.error("AI response format is incorrect.");
        }
      } else {
        console.error("AI response is not an array or is empty:", parsedData);
        toast.error("AI response format is incorrect.");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary from AI.");
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
            generateAI={(type: string) => GenerateSummaryFromAI(type, index)}
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
