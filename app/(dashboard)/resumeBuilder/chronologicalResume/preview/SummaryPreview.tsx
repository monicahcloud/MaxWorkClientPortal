"use client";

import React from "react";

interface SummaryProps {
  summary: string | { text: string } | null;
}

const SummaryPreview = ({ summary }: SummaryProps) => {
  let summaryText = "";
  let displayMessage = "Start typing your summary...";

  if (summary) {
    if (typeof summary === "string") {
      summaryText = summary;
      displayMessage = summary;
    } else if (typeof summary === "object") {
      summaryText = summary.text;
      displayMessage = summary.text;
    }
  }

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold mb-2 uppercase text-center">
        Professional Summary
      </h1>
      <hr />
      <p className="mt-4 text-sm text-gray-700 whitespace-pre-line">
        {displayMessage}
      </p>
    </div>
  );
};

export default SummaryPreview;
