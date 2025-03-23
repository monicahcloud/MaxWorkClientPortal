import React from "react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import { format } from "date-fns";

function ExperiencePreview() {
  const { experiences } = useResumeBuilder();

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold mb-2 uppercase">Experience</h1>
      <hr />

      {experiences.map((exp, index) => (
        <div key={index} className="mt-6">
          <h2 className="text-sm flex font-bold justify-between">
            {exp.company || "Your Company or Agency Name"}{" "}
            <span>
              {exp.startDate ? format(exp.startDate, "MMM yyyy") : "Start Date"}{" "}
              -{" "}
              {exp.endDate
                ? format(exp.endDate, "MMM yyyy")
                : "Present or End Date"}
            </span>
          </h2>

          <h2 className="text-xs flex justify-between">
            {exp.grade || "G-XX"},
            <span>Job Series: {exp.status || "0000"}</span>
            <span>({exp.time || "00 hrs/wk"})</span>
            <span>{exp.clearance || "Security Clearance"}</span>
          </h2>

          <h2 className="text-sm font-bold mt-1">
            {exp.role || "Your Title or Command"}
          </h2>

          <div className="mt-3 space-y-2 text-xs">
            <div>
              <span className="block font-bold uppercase">Duties:</span>
              <p
                className="mt-1"
                dangerouslySetInnerHTML={{
                  __html: exp.duties,
                }}
              />
            </div>

            <div>
              <span className="block font-bold uppercase">
                Responsibilities:
              </span>
              <p
                className="mt-1"
                dangerouslySetInnerHTML={{
                  __html: exp.responsibilities,
                }}
              />
            </div>

            <div>
              <span className="block font-bold uppercase">
                Key Accomplishments:
              </span>
              <p
                className="mt-1"
                dangerouslySetInnerHTML={{
                  __html: exp.accomplishments,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
