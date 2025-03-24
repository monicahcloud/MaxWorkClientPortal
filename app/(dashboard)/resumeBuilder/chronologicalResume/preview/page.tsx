import React from "react";
import PersonDetailPreview from "./PersonDetailPreview";
import SummaryPreview from "./SummaryPreview";
import ExperiencePreview from "./ExperiencePreview";
import EducationPreview from "./EducationPreview";
import SkillPreview from "./SkillPreview";
import CertificationPreview from "./CertificationPreview";

export default function ChronologicalPreviewSection() {
  return (
    <div className="shadow-lg h-full p-14 border-t-[20px]">
      {/* Personal Detail */}
      <PersonDetailPreview />
      {/* Summary */}
      <SummaryPreview />
      {/* Professional Experience */}
      <ExperiencePreview />
      {/* Education */}
      <EducationPreview />
      {/* Certification */}
      <CertificationPreview />
      {/* Skills */}
      <SkillPreview />
    </div>
  );
}
