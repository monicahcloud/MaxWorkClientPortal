import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonDetailPreview from "./preview/PersonDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";
import SkillPreview from "./preview/SkillPreview";

export default function PreviewSection() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}>
      {/* Personal Detail */}
      <PersonDetailPreview resumeInfo={resumeInfo} />
      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />
      {/* Education */}
      <EducationPreview resumeInfo={resumeInfo} />
      {/* Skills */}
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  );
}
