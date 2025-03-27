"use client";

import React from "react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import CertificationPreview from "./CertificationPreview";
import EducationPreview from "./EducationPreview";
import PersonalDetailPreview from "./PersonDetailPreview";
import SkillPreview from "./SkillPreview";
import SummaryPreview from "./SummaryPreview";
import ExperiencePreview from "./ExperiencePreview";

interface ChronologicalPreviewSectionProps {
  resumeData?: any;
}

export default function ChronologicalPreviewSection({
  resumeData,
}: ChronologicalPreviewSectionProps) {
  const context = useResumeBuilder();

  // Use resumeData if provided, else fall back to context
  const personalInfo = resumeData?.personalInfo || context.personalInfo;
  const summary = resumeData?.summary || context.summary;
  const experiences = resumeData?.experiences || context.experiences;
  const education = resumeData?.education || context.education;
  const skills = resumeData?.skills || context.skills;
  const certifications = resumeData?.certifications || context.certifications;
  console.log("Experiences:", experiences);
  console.log("Education:", education);
  return (
    <div className="shadow-lg h-full p-14 border-t-[20px]">
      {/* Personal Detail */}
      <PersonalDetailPreview personalInfo={personalInfo} />

      {/* Summary */}
      <SummaryPreview summary={summary} />

      {/* Professional Experience */}
      <ExperiencePreview experiences={experiences} />

      {/* Education */}
      <EducationPreview education={education} />

      {/* Certification */}
      <CertificationPreview certifications={certifications} />

      {/* Skills */}
      <SkillPreview skills={skills} />
    </div>
  );
}
