import React from "react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext"; // Import useResumeBuilder
import { Skill } from "@/app/context/ResumeBuilderContext"; // Import Skill interface

function SkillPreview() {
  const { skills } = useResumeBuilder(); // Access skills from context
  // Check if there are any skills
  if (!skills || skills.length === 0) {
    return null; // Don't render anything if no skills are present
  }
  return (
    <div className="my-6">
      <h1 className="text-xl font-bold mb-2 uppercase">skills</h1>
      <hr />
      <div className="grid grid-cols-2 gap-3 my-4">
        {skills.map((skill: Skill) => {
          // Type skill as Skill
          const ratingPercentage = parseInt(skill.level, 10) * 20;

          return (
            <div key={skill.name} className="flex items-center justify-between">
              <h2 className="text-xs">{skill.name}</h2>
              <div className="h-2 bg-gray-200 w-[120px]">
                <div
                  className="h-2 bg-blue-700"
                  style={{
                    width: `${ratingPercentage}%`,
                  }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillPreview;
