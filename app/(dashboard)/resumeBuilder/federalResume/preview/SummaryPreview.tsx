"use client";

import React from "react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

function SummaryPreview() {
  const { summary } = useResumeBuilder();

  const placeholder = `Provide a detailed summary of EVERY civilian job or military duty starting with the most recent. SPECIFY if you were military or civilian. If you have had multiple civilian jobs then feel free to break your experience into separate military and civilian sections but understand that virtually all Hiring Managers and Recruiters prefer to see a chronological timeline of your experience..`;

  let summaryContent: string;

  if (typeof summary === "string") {
    // If summary is already a string, use it directly
    summaryContent = summary;
  } else if (summary && typeof summary === "object") {
    //if summary is an object, extract the needed value.
    summaryContent = summary.text;
  } else {
    // If summary is null or undefined, use the placeholder
    summaryContent = placeholder;
  }

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold mb-2 uppercase">Professional Summary</h1>
      <p className="text-sm text-gray-700 whitespace-pre-line">
        {summaryContent}
      </p>
    </div>
  );
}

export default SummaryPreview;
