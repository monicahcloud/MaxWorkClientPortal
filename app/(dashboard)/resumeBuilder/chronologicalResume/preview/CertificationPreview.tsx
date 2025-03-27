import React from "react";

interface Certification {
  title?: string;
  issuer?: string;
  issueDate?: string;
  expirationDate?: string;
}

interface CertificationPreviewProps {
  certifications: Certification[];
}

const CertificationPreview = ({
  certifications,
}: CertificationPreviewProps) => {
  const hasCertifications = certifications.some(
    (cert) => cert.title || cert.issuer || cert.issueDate || cert.expirationDate
  );

  if (!hasCertifications) {
    return null;
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
                ? new Date(cert.issueDate).toISOString().split("T")[0]
                : "N/A"}{" "}
              -{" "}
              {cert.expirationDate
                ? new Date(cert.expirationDate).toISOString().split("T")[0]
                : "N/A"}
            </span>
          </h2>
          <h2 className="text-xs">{cert.issuer}</h2>
        </div>
      ))}
    </div>
  );
};

export default CertificationPreview;
