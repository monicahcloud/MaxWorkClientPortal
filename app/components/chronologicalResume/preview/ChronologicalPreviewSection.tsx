"use client";

import React from "react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import PersonalDetailPreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/PersonDetailPreview";
import SummaryPreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/SummaryPreview";
import EducationPreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/EducationPreview";
import ExperiencePreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/ExperiencePreview";
import CertificationPreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/CertificationPreview";
import SkillPreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/SkillPreview";

interface ChronologicalPreviewSectionProps {
  resumeData?: any;
}

const ChronologicalPreviewSection = ({
  resumeData,
}: ChronologicalPreviewSectionProps) => {
  const context = useResumeBuilder();

  const personalInfo = resumeData?.personalInfo || context.personalInfo;
  const summary = resumeData?.summary || context.summary;
  const experiences = resumeData?.experiences || context.experiences;
  const education = resumeData?.education || context.education;
  const skills = resumeData?.skills || context.skills;
  const certifications = resumeData?.certifications || context.certifications;

  return (
    <div className="shadow-lg h-full p-14 border-t-[20px]">
      <PersonalDetailPreview personalInfo={personalInfo} />
      <SummaryPreview summary={summary} />
      <ExperiencePreview experiences={experiences} />
      <EducationPreview education={education} />
      <CertificationPreview certifications={certifications} />
      <SkillPreview skills={skills} />
    </div>
  );
};
export default ChronologicalPreviewSection;
