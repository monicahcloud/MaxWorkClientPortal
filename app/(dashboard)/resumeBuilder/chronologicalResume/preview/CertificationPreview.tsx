import React from "react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

function CertificationPreview() {
  const { certifications } = useResumeBuilder();
  // Check if there are any certifications with actual data
  const hasCertifications = certifications.some(
    (cert) => cert.title || cert.issuer || cert.issueDate || cert.expirationDate
  );

  if (!hasCertifications) {
    return null; // Don't render anything if no certifications with data
  }

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold text-center mb-2 uppercase">
        TRAINING &amp; PROFESSIONAL Certifications
      </h1>
      <hr />
      {certifications.map((cert, index) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold flex justify-between">
            {cert.title}
            <span>
              {cert.issueDate
                ? cert.issueDate.toISOString().split("T")[0]
                : "N/A"}{" "}
              -{" "}
              {cert.expirationDate
                ? cert.expirationDate.toISOString().split("T")[0]
                : "N/A"}
            </span>
          </h2>
          <h2 className="text-xs ">{cert.issuer}</h2>
        </div>
      ))}
    </div>
  );
}

export default CertificationPreview;
