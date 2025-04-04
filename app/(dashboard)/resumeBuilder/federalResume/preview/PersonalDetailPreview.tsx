"use client";

import React from "react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

function PersonalDetailPreview() {
  const { personalInfo } = useResumeBuilder();

  const fullName = `${personalInfo.firstName || "Jane"} ${
    personalInfo.lastName || "Johnson, MBA"
  }`;

  return (
    <div className="mb-6 flex flex-col text-center">
      {/* Logo + Name */}
      <div className="flex items-center ">
        <h1 className="text-3xl ml-31 font-semibold capitalize">{fullName}</h1>
      </div>

      {/* Job Title */}
      <h2 className="text-lg font-bold text-gray-800 ">
        {personalInfo.jobTitle || "Director of Finance"}
      </h2>

      {/* Address + Department */}
      <div className="">
        <h2 className="text-md font-medium text-gray-700">
          {personalInfo.address || "1234 Main St, Anytown, MA 12345"}
        </h2>
        <h2 className="text-md font-normal text-gray-600">
          {personalInfo.department || "Department of Treasury"}
        </h2>
      </div>

      {/* Contact Info */}
      <div className="mt-2 text-sm text-gray-600 flex flex-wrap justify-center gap-6">
        <span>📧 {personalInfo.email || "you@email.com"}</span>
        <span>📞 {personalInfo.phone || "(123) 456-7890"}</span>
        <span>🌐 {personalInfo.website || "www.yourportfolio.com"}</span>
      </div>

      <hr className="border-t-2 border-blue-900 mt-6 w-full" />
    </div>
  );
}

export default PersonalDetailPreview;
