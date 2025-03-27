"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ChronologicalFormSection from "@/app/components/chronologicalResume/forms/ChronologicalFormSection";

export default function Page() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const resumeTitle = searchParams.get("resumeTitle");

  if (!resumeId) {
    return <div className="text-red-500">Error: Missing resumeId</div>;
  }
  if (!resumeTitle) {
    return <div className="text-red-500">Error: Missing resumeTitle</div>;
  }

  return (
    <ChronologicalFormSection resumeId={resumeId} resumeTitle={resumeTitle} />
  );
}
