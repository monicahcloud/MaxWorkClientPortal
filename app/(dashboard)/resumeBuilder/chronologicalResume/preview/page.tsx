// app/(dashboard)/resumeBuilder/chronologicalResume/preview/page.tsx

"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ChronologicalPreviewSection from "@/app/components/chronologicalResume/preview/ChronologicalPreviewSection";

export default function Page() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  // Optionally fetch resumeData here if needed
  // For now we're just using context as fallback

  return <ChronologicalPreviewSection />;
}
