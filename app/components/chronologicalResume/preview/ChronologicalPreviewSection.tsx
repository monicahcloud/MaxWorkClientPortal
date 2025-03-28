"use client";

import React from "react";
import {
  useResumeBuilder,
  PersonalInfo,
  Summary,
  Experience,
  Education,
  Skill,
  Certification,
} from "@/app/context/ResumeBuilderContext";
import PersonalDetailPreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/PersonDetailPreview";
import SummaryPreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/SummaryPreview";
import EducationPreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/EducationPreview";
import ExperiencePreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/ExperiencePreview";
import CertificationPreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/CertificationPreview";
import SkillPreview from "@/app/(dashboard)/resumeBuilder/chronologicalResume/preview/SkillPreview";

interface ChronologicalPreviewSectionProps {
  personalInfo: PersonalInfo;
  summary: Summary | null;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
}

const ChronologicalPreviewSection: React.FC<
  ChronologicalPreviewSectionProps
> = ({
  personalInfo,
  summary,
  experiences,
  education,
  skills,
  certifications,
}) => {
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
