"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ResumeBuilderProvider,
  useResumeBuilder,
} from "@/app/context/ResumeBuilderContext"; // Import useResumeBuilder
import ChronologicalFormSection from "@/app/components/chronologicalResume/forms/ChronologicalFormSection";
import ChronologicalPreviewSection from "@/app/components/chronologicalResume/preview/ChronologicalPreviewSection";

// Wrap the part that uses `useSearchParams()` in a separate client component
function ChronologicalResumeInner() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const {
    personalInfo,
    summary,
    experiences,
    education,
    skills,
    certifications,
  } = useResumeBuilder(); // Get context data

  if (!resumeId) {
    return <div className="text-center text-red-500">Missing resume ID</div>;
  }

  return (
    <div className="w-full px-4 lg:px-8 2xl:px-12 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Chronological Resume Builder
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChronologicalFormSection resumeId={resumeId} resumeTitle={""} />
        <ChronologicalPreviewSection
          personalInfo={personalInfo}
          summary={summary}
          experiences={experiences}
          education={education}
          skills={skills}
          certifications={certifications}
        />
      </div>
    </div>
  );
}

export default function ChronologicalResumePage() {
  return (
    <ResumeBuilderProvider>
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <ChronologicalResumeInner />
      </Suspense>
    </ResumeBuilderProvider>
  );
}
