"use client";

import React from "react";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import Skills from "./preview/CertificationPreview";
import Experience from "./preview/ExperiencePreview";

const PersonalDetailSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <PersonalDetailsForm onComplete={() => {}} /> {/* ✅ No props */}
      <PersonalDetailPreview /> {/* ✅ No props */}
      <Experience />
      <Skills />
    </div>
  );
};

export default PersonalDetailSection;
