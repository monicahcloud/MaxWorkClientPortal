import React from "react";

interface Skill {
  name: string;
  level: string; // assuming level is stored as a string like "3", "5", etc.
}

interface SkillPreviewProps {
  skills: Skill[];
}

const SkillPreview = ({ skills }: SkillPreviewProps) => {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className="my-6">
      <h1 className="text-xl font-bold mb-2 text-center tracking-wide uppercase">
        Skills
      </h1>
      <hr />
      <div className="grid grid-cols-2 gap-3 my-4">
        {skills.map((skill) => {
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
};

export default SkillPreview;
