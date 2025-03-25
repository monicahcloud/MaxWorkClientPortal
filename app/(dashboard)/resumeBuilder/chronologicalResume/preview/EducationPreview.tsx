"use client";

import React from "react";
import {
  useResumeBuilder,
  Education as EducationType,
} from "@/app/context/ResumeBuilderContext";

interface EducationPreviewProps {
  education?: EducationType[];
}

const EducationPreview: React.FC<EducationPreviewProps> = ({
  education: propEducation,
}) => {
  const context = useResumeBuilder();
  const education = propEducation || context.education;

  if (!education || education.length === 0) return null;

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold text-center mb-2 uppercase">
        Education
      </h1>
      <hr />
      {education.map((edu, index) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold flex justify-between">
            {edu.degree}: {edu.field}
            <span>
              {edu.startYear} - {edu.endYear}
            </span>
          </h2>
          <h2 className="text-xs">{edu.school}</h2>
        </div>
      ))}
    </div>
  );
};

export default EducationPreview;
