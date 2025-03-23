"use client";

import React from "react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

function SummaryPreview() {
  const { summary } = useResumeBuilder();

  const placeholder = `Provide a detailed summary of EVERY civilian job or military duty starting with the most recent. SPECIFY if you were military or civilian. If you have had multiple civilian jobs then feel free to break your experience into separate military and civilian sections but understand that virtually all Hiring Managers and Recruiters prefer to see a chronological timeline of your experience..`;

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold mb-2 uppercase">Professional Summary</h1>
      <p className="text-sm text-gray-700 whitespace-pre-line">
        {summary.trim() ? summary : placeholder}
      </p>
    </div>
  );
}

export default SummaryPreview;
