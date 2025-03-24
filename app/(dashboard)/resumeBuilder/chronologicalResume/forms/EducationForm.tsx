"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Education } from "@/app/context/ResumeBuilderContext"; // Adjust import path

interface EducationFormProps {
  education: Education;
  index: number;
  onChange: (index: number, updated: Education) => void;
  onRemove: (index: number) => void;
}

function EducationForm({
  education,
  index,
  onChange,
  onRemove,
}: EducationFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(index, { ...education, [name]: value });
  };

  return (
    <div className="border p-4 rounded-md mt-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold mb-2 uppercase">
          Education #{index + 1}
        </h2>
        <Button variant="destructive" size="sm" onClick={() => onRemove(index)}>
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Degree</Label>
          <Input
            type="text"
            name="degree"
            value={education.degree}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Field of Study</Label>
          <Input
            type="text"
            name="field"
            value={education.field}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label>Start Year</Label>
          <Input
            type="number"
            name="startYear"
            value={education.startYear}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>End Year</Label>
          <Input
            type="number"
            name="endYear"
            value={education.endYear}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-2">
          <Label>School Name, Location</Label>
          <Input
            type="text"
            name="school"
            value={education.school}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default EducationForm;
