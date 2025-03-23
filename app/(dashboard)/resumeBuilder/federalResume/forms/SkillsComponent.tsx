"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import SkillsForm from "./SkillsForm";
import { toast } from "sonner";

function SkillsComponent() {
  const { skills, setSkills } = useResumeBuilder();
  const [loading, setLoading] = useState(false);

  const AddNewSkill = () => {
    setSkills([
      ...skills,
      {
        name: "",
        level: "0",
      },
    ]);
  };

  const RemoveSkill = (indexToRemove: number) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  const handleSaveSkills = async () => {
    setLoading(true);
    try {
      const resumeId = new URLSearchParams(window.location.search).get(
        "resumeId"
      );
      if (!resumeId) {
        toast.error("Resume ID not found.");
        return;
      }
      const skillWithResumeId = skills.map((skill) => ({
        ...skill,
        resumeId: resumeId,
      }));

      const res = await fetch("/api/resume/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skillWithResumeId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save skill.");
      }

      toast.success("Skills saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save skill.");
    } finally {
      setLoading(false);
    }
  };

  const updateSkill = (
    index: number,
    updatedSkill: { name: string; level: string }
  ) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? updatedSkill : skill
    );
    setSkills(updatedSkills);
  };

  return (
    <div className="p-4 border-t-4 border-blue-600 bg-gray-50 rounded-md shadow">
      <h1 className="text-2xl font-bold">Skills</h1>

      {skills.map((skill, index) => (
        <SkillsForm
          key={index}
          index={index}
          onRemove={RemoveSkill}
          onComplete={handleSaveSkills}
          skill={skill}
          updateSkill={updateSkill}
        />
      ))}

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={AddNewSkill}>
          + Add Skill
        </Button>
        <Button onClick={handleSaveSkills} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default SkillsComponent;
