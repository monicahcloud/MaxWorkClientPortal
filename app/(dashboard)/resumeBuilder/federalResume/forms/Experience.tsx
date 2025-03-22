"use client";

import React, { useEffect, useState } from "react";
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

function ExperienceForm({
  experience,
  index,
  onChange,
  onRemove,
}: {
  experience: ExperienceType;
  index: number;
  onChange: (index: number, updated: ExperienceType) => void;
  onRemove: (index: number) => void;
}) {
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

  useEffect(() => {
    console.log(experience);
  }, [experience]);
  return (
    <div className="border p-4 rounded-md mt-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Experience #{index + 1}</h2>
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

        <div className="flex flex-row gap-2">
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
                  {experience.startDate ? (
                    format(experience.startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
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
                  {experience.endDate ? (
                    format(experience.endDate, "PPP")
                  ) : isPresent ? (
                    "Present"
                  ) : (
                    <span>Pick a date</span>
                  )}
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
        <div>
          <Label>Grade</Label>
          <Input
            type="text"
            name="grade"
            value={experience.grade}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Job Series</Label>
          <Input
            type="text"
            name="status"
            value={experience.status}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Time</Label>
          <Input
            type="text"
            name="time"
            value={experience.time}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Clearance</Label>
          <Input
            type="text"
            name="clearance"
            value={experience.clearance}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-2">
        <Label>Title or Command</Label>
        <Input
          type="text"
          name="role"
          value={experience.role}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-2">
        <Label>Duties</Label>
        <RichTextEditor
          onRichTextEditorChange={(event) =>
            handleRichTextEditor(event, "duties")
          }
        />
      </div>

      <div className="mt-2">
        <Label>Responsibilities</Label>
        <RichTextEditor
          onRichTextEditorChange={(event) =>
            handleRichTextEditor(event, "responsibilities")
          }
        />
      </div>

      <div className="mt-2">
        <Label>Key Accomplishments</Label>
        <RichTextEditor
          onRichTextEditorChange={(event) =>
            handleRichTextEditor(event, "accomplishments")
          }
        />
      </div>

      <div className="col-span-2 mt-2"></div>
    </div>
  );
}

function Experience() {
  const { experiences, setExperiences } = useResumeBuilder();

  const handleExperienceChange = (index: number, updated: ExperienceType) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = updated;
    setExperiences(updatedExperiences);
  };

  const AddNewExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: "",
        startDate: undefined,
        endDate: undefined,
        description: "",
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
    const filtered = experiences.filter((_, index) => index !== indexToRemove);
    setExperiences(filtered);
  };

  return (
    <div className="p-4 border-t-4 border-blue-600 bg-gray-50 rounded-md shadow">
      <h1 className="text-2xl font-bold">Experience</h1>

      {experiences.map((exp, index) => (
        <ExperienceForm
          key={index}
          experience={exp}
          index={index}
          onChange={handleExperienceChange}
          onRemove={RemoveExperience}
        />
      ))}

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={AddNewExperience}>
          + Add Experience
        </Button>
        <Button>Save</Button>
      </div>
    </div>
  );
}

export default Experience;
