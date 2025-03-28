// app/(dashboard)/resumeBuilder/chronologicalResume/forms/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import ChronologicalFormSection from "@/app/components/chronologicalResume/forms/ChronologicalFormSection";

function FormLoader() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const resumeTitle = searchParams.get("resumeTitle");

  if (!resumeId || !resumeTitle) {
    return <p className="text-red-500">Missing resumeId or resumeTitle</p>;
  }

  return (
    <ChronologicalFormSection resumeId={resumeId} resumeTitle={resumeTitle} />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <FormLoader />
    </Suspense>
  );
}
