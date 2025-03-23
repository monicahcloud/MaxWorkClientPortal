import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import React from "react";

function EducationPreview() {
  const { education } = useResumeBuilder();

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold mb-2 uppercase">Education</h1>
      <hr />
      {education.map((edu, index) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold flex justify-between">
            {edu.degree}: {edu.field}
            <span>
              {edu.startYear} - {edu.endYear}
            </span>
          </h2>
          <h2 className="text-xs ">{edu.school}</h2>
        </div>
      ))}
    </div>
  );
}

export default EducationPreview;
