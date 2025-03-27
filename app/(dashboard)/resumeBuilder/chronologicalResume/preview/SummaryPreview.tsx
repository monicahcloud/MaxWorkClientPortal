"use client";

import React from "react";

interface SummaryProps {
  summary: string | { text: string };
}

const SummaryPreview = ({ summary }: SummaryProps) => {
  let summaryText = "";

  if (typeof summary === "string") {
    summaryText = summary;
  } else if (summary && typeof summary === "object") {
    summaryText = summary.text;
  }

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold mb-2 uppercase text-center">
        Professional Summary
      </h1>
      <hr />
      <p className="mt-4 text-sm text-gray-700 whitespace-pre-line">
        {summaryText || "Start typing your summary..."}
      </p>
    </div>
  );
};

export default SummaryPreview;
