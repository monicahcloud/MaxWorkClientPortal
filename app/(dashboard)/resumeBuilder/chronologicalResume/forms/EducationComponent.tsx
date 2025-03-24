"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useResumeBuilder,
  Education,
} from "@/app/context/ResumeBuilderContext";
import EducationForm from "./EducationForm";
import { toast } from "sonner";

interface Props {
  onComplete: () => void;
}

function EducationComponent({ onComplete }: Props) {
  const { education, setEducation } = useResumeBuilder();
  const [loading, setLoading] = useState(false);

  const handleEducationChange = (index: number, updated: Education) => {
    setEducation((prevEducations) => {
      const updatedEducations = prevEducations.map((edu, i) => {
        if (i === index) {
          return { ...edu, ...updated };
        }
        return edu;
      });
      return updatedEducations;
    });
  };

  const AddNewEducation = () => {
    setEducation([
      ...education,
      {
        school: "",
        degree: "",
        field: "",
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear(),
      },
    ]);
  };

  const RemoveEducation = (indexToRemove: number) => {
    setEducation(education.filter((_, index) => index !== indexToRemove));
  };

  const handleSaveEducations = async () => {
    setLoading(true);
    try {
      const resumeId = new URLSearchParams(window.location.search).get(
        "resumeId"
      );
      if (!resumeId) {
        toast.error("Resume ID not found.");
        return;
      }

      const educationsWithResumeId = education.map((edu) => ({
        ...edu,
        resumeId: resumeId,
      }));
      console.log("Educations being sent:", educationsWithResumeId); // Add th
      const res = await fetch("/api/resume/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ education: educationsWithResumeId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save education.");
      }

      toast.success("Education saved successfully!");
      if (onComplete) {
        onComplete();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save education.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-t-4 border-blue-600 bg-gray-50 rounded-md shadow">
      <h1 className="text-2xl font-bold">Education</h1>

      {education.map((edu, index) => (
        <EducationForm
          key={index}
          education={edu}
          index={index}
          onChange={handleEducationChange}
          onRemove={RemoveEducation}
        />
      ))}

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={AddNewEducation}>
          + Add Education
        </Button>
        <Button onClick={handleSaveEducations} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default EducationComponent;
