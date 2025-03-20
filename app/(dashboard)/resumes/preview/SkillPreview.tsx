import React from "react";

interface Skills {
  id: string;
  name: string;
  rating: string;
}

interface ResumeInfo {
  themeColor: string;
  skills: Skills[];
}

interface SkillsPreviewProps {
  resumeInfo: ResumeInfo;
}

function SkillPreview({ resumeInfo }: SkillsPreviewProps) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-xl mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}>
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xs">{skill.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2"
                style={{
                  background: resumeInfo?.themeColor,
                  width: skill.rating + "%",
                }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillPreview;
