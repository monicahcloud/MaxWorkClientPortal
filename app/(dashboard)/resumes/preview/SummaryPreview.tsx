import React from "react";

interface ResumeInfo {
  summary: string;
  // Other properties you may have on resumeInfo can be added here
}

// Define the type for resumeInfo prop
interface SummaryPreviewProps {
  resumeInfo: ResumeInfo; // Expecting resumeInfo to be of type ResumeInfo
}

function SummaryPreview({ resumeInfo }: SummaryPreviewProps) {
  return <p className="text-sm">{resumeInfo?.summary}</p>;
}

export default SummaryPreview;
