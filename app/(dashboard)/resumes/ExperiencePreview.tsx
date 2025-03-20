import React from "react";

interface Experience {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  workSummary: string;
}

interface ResumeInfo {
  themeColor: string;
  experience: Experience[];
}

interface ExperiencePreviewProps {
  resumeInfo: ResumeInfo;
}

function ExperiencePreview({ resumeInfo }: ExperiencePreviewProps) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-xl mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}>
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience.map((experience, index) => (
        <div key={index}>
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}>
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate}
              {experience?.currentlyWorking
                ? " Present"
                : `, ${experience?.endDate}`}
            </span>
          </h2>
          <p className="text-xs my-2">{experience?.workSummary}</p>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
