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
                  __html:
                    exp.duties ||
                    "Provide a <strong>DETAILED</strong> discussion of your responsibilities, duties, and accomplishments. Be honest but don’t be humble. Give <strong>SUBSTANTIVE</strong> explanations of your achievements: Led and supervised squad of 10 riflemen in all daily tasks and operations, effectively managed program X to Y &amp; Z results, mentored XX employees, sailors, etc., managed $XXX,XXX worth of equipment, budget, or resources.",
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
                  __html:
                    exp.responsibilities ||
                    `No FLUFF OR BUZZ WORDS! No “results driven”, “detail oriented” or “outside the box” comments. They may sound impressive but recruiters and hiring managers see it on hundreds of resumes. Stick with quantifiable examples.`,
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
                  __html:
                    exp.accomplishments ||
                    `Again, be honest but do not be humble and sell yourself as being able to do a job by demonstrating HOW you have done it or related work previously!`,
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
