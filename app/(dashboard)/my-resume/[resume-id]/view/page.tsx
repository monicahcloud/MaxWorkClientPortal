"use client";
import ChronologicalPreviewSection from "@/app/components/chronologicalResume/preview/ChronologicalPreviewSection";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";

const ViewResumePage = () => {
  const {
    personalInfo,
    summary,
    experiences,
    education,
    skills,
    certifications,
  } = useResumeBuilder();

  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <h2 className="text-center text-2xl font-medium">
          Congrats! Your Resume is ready.
        </h2>
        <p className="text-center text-gray-500">
          Now you are ready to download your resume and you can share a unique
          url with your friends and family.
        </p>
        <div className="flex justify-between px-44 my-10">
          <Button>Download</Button>
          <Button>Share</Button>
        </div>
        <div>
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
    </Suspense>
  );
};

export default ViewResumePage;
