"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChronologicalPreviewSection from "@/app/components/chronologicalResume/preview/ChronologicalPreviewSection";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

function PreviewLoader() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  // Access context data
  const {
    personalInfo,
    summary,
    experiences,
    education,
    skills,
    certifications,
  } = useResumeBuilder();

  if (!resumeId) {
    return <div className="text-red-500">Missing resumeId</div>;
  }

  return (
    <ChronologicalPreviewSection
      personalInfo={personalInfo}
      summary={summary}
      experiences={experiences}
      education={education}
      skills={skills}
      certifications={certifications}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <PreviewLoader />
    </Suspense>
  );
}
