"use client";

import React from "react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

interface SummaryPreviewProps {
  summary?: string | { text: string };
}

const SummaryPreview: React.FC<SummaryPreviewProps> = ({
  summary: propSummary,
}) => {
  const context = useResumeBuilder();
  const summary = propSummary || context.summary;

  const placeholder = "";

  let summaryContent: string;

  if (typeof summary === "string") {
    summaryContent = summary;
  } else if (summary && typeof summary === "object") {
    summaryContent = summary.text;
  } else {
    summaryContent = placeholder;
  }

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold mb-2 uppercase text-center">
        Professional Summary
      </h1>
      <p className="text-sm text-gray-700 whitespace-pre-line">
        {summaryContent}
      </p>
    </div>
  );
};

export default SummaryPreview;
