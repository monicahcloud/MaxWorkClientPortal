"use client";

import React from "react";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";

const PersonalDetailSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <PersonalDetailsForm /> {/* ✅ No props */}
      <PersonalDetailPreview /> {/* ✅ No props */}
    </div>
  );
};

export default PersonalDetailSection;
