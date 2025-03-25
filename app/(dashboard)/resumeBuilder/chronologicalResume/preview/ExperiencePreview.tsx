"use client";

import React from "react";
import {
  useResumeBuilder,
  Experience as ExperienceType,
} from "@/app/context/ResumeBuilderContext";
import { format } from "date-fns";

interface ExperiencePreviewProps {
  experiences?: ExperienceType[];
}

const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({
  experiences: propExperiences,
}) => {
  const context = useResumeBuilder();
  const experiences = propExperiences || context.experiences;

  if (!experiences || experiences.length === 0) return null;

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold mb-2 text-center uppercase">
        Experience
      </h1>
      <hr />

      {experiences.map((exp, index) => (
        <div key={index} className="mt-6">
          <h2 className="text-sm flex font-bold justify-between">
            {exp.role || "Job Title"}{" "}
            <span>
              {exp.startDate
                ? format(new Date(exp.startDate), "MMM yyyy")
                : "Start Date"}{" "}
              -{" "}
              {exp.endDate
                ? format(new Date(exp.endDate), "MMM yyyy")
                : "Present or End Date"}
            </span>
          </h2>

          <h2 className="text-sm font-bold mt-1">
            {exp.company || "Company Name"}
          </h2>

          <div className="mt-3 space-y-2 text-xs">
            {exp.duties && (
              <div>
                <ul className="list-disc list-inside mt-1">
                  {exp.duties.split("\n").map((duty, dutyIndex) => (
                    <li key={dutyIndex}>{duty.replace(/^\s*-\s*/, "")}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;
