"use client";

import React from "react";
import {
  useResumeBuilder,
  PersonalInfo,
} from "@/app/context/ResumeBuilderContext";

const PersonalDetailPreview = () => {
  const { personalInfo } = useResumeBuilder();

  const fullName = `${personalInfo?.firstName || "FirstName"} ${
    personalInfo?.lastName || "LastName"
  }`;

  return (
    <div className="mb-6 flex flex-col text-center">
      <div className="flex items-center">
        <h1 className="text-3xl mx-auto font-semibold capitalize">
          {fullName}
        </h1>
      </div>

      <h2 className="text-lg font-bold text-gray-800">
        {personalInfo?.jobTitle || "Job Title"}
      </h2>

      <div>
        <h2 className="text-md font-medium text-gray-700">
          {personalInfo?.address || "1234 Main St, Anytown, MA 12345"}
        </h2>
      </div>

      <div className="mt-2 text-sm text-gray-600 flex flex-wrap justify-center gap-2">
        <span>📧 {personalInfo?.email || "you@email.com"}</span>
        <span>📞 {personalInfo?.phone || "(123) 456-7890"}</span>
        <span>🌐 {personalInfo?.website || "www.yourportfolio.com"}</span>
      </div>

      <hr className="border-t-2 border-blue-900 mt-6 w-full" />
    </div>
  );
};

export default PersonalDetailPreview;
