"use client";

import React from "react";
import FunctionalFormPage from "./forms/page";
import FunctionalPreviewPage from "./preview/page";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

function FunctionalTemplate() {
  const {
    personalInfo,
    summary,
    image,
    experiences,
    education,
    certifications,
  } = useResumeBuilder();

  return (
    <div className="w-full px-4 lg:px-8 2xl:px-12 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Functional Resume Builder
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FunctionalFormPage />
        <FunctionalPreviewPage
          personalInfo={personalInfo}
          summary={summary}
          image={image}
          experiences={experiences}
          education={education}
          certifications={certifications}
        />
      </div>
    </div>
  );
}

export default FunctionalTemplate;
