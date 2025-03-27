"use client";

import React from "react";
import { useSearchParams } from "next/navigation"; // or useParams if it's part of route params
import { ResumeBuilderProvider } from "@/app/context/ResumeBuilderContext";
import ChronologicalFormSection from "./forms/page";
import ChronologicalPreviewSection from "../chronologicalResume/preview/page";

function ChronologicalResume() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId"); // ✅ Make sure this matches how you're using the ID

  if (!resumeId) {
    return <div className="text-center text-red-500">Missing resume ID</div>;
  }

  return (
    <ResumeBuilderProvider>
      <div className="w-full px-4 lg:px-8 2xl:px-12 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Chronological Resume Builder
        </h1>

        {/* Grid layout for form + preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChronologicalFormSection resumeId={resumeId} />
          <ChronologicalPreviewSection />
        </div>
      </div>
    </ResumeBuilderProvider>
  );
}

export default ChronologicalResume;
