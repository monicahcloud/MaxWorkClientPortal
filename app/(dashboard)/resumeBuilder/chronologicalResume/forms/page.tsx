"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ChronologicalFormSection from "@/app/components/chronologicalResume/forms/page";

export default function Page() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  if (!resumeId) {
    return <div className="text-red-500">Error: Missing resumeId</div>;
  }

  return <ChronologicalFormSection resumeId={resumeId} />;
}
