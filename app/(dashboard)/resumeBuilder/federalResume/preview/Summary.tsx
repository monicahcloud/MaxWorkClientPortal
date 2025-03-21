"use client";

import React from "react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

function SummaryPreview() {
  const { summary } = useResumeBuilder();

  const placeholder = `A highly motivated and detail-oriented professional with a strong background in administrative operations and strategic planning. Passionate about driving efficiency and delivering measurable results across cross-functional teams.`;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">Professional Summary</h1>
      <p className="text-sm text-gray-700 whitespace-pre-line">
        {summary.trim() ? summary : placeholder}
      </p>
    </div>
  );
}

export default SummaryPreview;
