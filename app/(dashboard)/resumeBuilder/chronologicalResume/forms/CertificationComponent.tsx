"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useResumeBuilder,
  Certification,
} from "@/app/context/ResumeBuilderContext";
import CertificationForm from "./CertificationForm";
import { toast } from "sonner";
interface Props {
  onComplete: () => void;
  resumeId: string;
}
function CertificationComponent({ onComplete, resumeId }: Props) {
  const { certifications, setCertifications } = useResumeBuilder();
  const [loading, setLoading] = useState(false);

  const handleCertificationChange = (index: number, updated: Certification) => {
    setCertifications((prevCerts) => {
      const updatedCerts = prevCerts.map((cert, i) => {
        if (i === index) {
          return { ...cert, ...updated };
        }
        return cert;
      });
      return updatedCerts;
    });
  };

  const AddNewCertification = () => {
    setCertifications([
      ...certifications,
      {
        title: "",
        issuer: "",
        issueDate: new Date(),
        expirationDate: undefined,
        credentialId: undefined,
        credentialUrl: undefined,
      },
    ]);
  };

  const RemoveCertification = (indexToRemove: number) => {
    setCertifications(
      certifications.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSaveCertifications = async () => {
    setLoading(true);
    try {
      const resumeId = new URLSearchParams(window.location.search).get(
        "resumeId"
      );
      if (!resumeId) {
        toast.error("Resume ID not found.");
        return;
      }
      const certificationsWithResumeId = certifications.map((cert) => ({
        ...cert,
        resumeId: resumeId,
      }));

      const res = await fetch("/api/resume/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certifications: certificationsWithResumeId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save certifications.");
      }

      toast.success("Certifications saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save certifications.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-t-4 border-blue-600 bg-gray-50 rounded-md shadow">
      <h1 className="text-2xl font-bold">Certifications</h1>

      {certifications.map((cert, index) => (
        <CertificationForm
          key={index}
          index={index}
          certification={cert}
          onChange={(updatedCert) =>
            handleCertificationChange(index, updatedCert)
          } // Corrected line
          onRemove={RemoveCertification}
        />
      ))}

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={AddNewCertification}>
          + Add Certification
        </Button>
        <Button onClick={handleSaveCertifications} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default CertificationComponent;
