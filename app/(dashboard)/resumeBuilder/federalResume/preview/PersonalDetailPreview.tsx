"use client";

import React from "react";
import Image from "next/image";
import fedlogo from "@/public/fedlogo.png";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

function PersonalDetailPreview() {
  const { personalInfo } = useResumeBuilder();

  const fullName = `${personalInfo.firstName || "First Name"} ${
    personalInfo.lastName || "Last Name"
  }`;

  return (
    <div className="mb-6 flex flex-col text-center">
      {/* Logo + Name */}
      <div className="flex items-center gap-4 ">
        <Image
          src={fedlogo}
          alt="Federal Logo"
          width={60}
          height={60}
          className="rounded-full object-contain"
          priority
        />
        <h1 className="text-4xl ml-25 font-semibold capitalize">{fullName}</h1>
      </div>

      {/* Job Title */}
      <h2 className="text-xl font-bold text-gray-800 mt-2">
        {personalInfo.jobTitle || "Director of Finance"}
      </h2>

      {/* Address + Department */}
      <div className="mt-1">
        <h2 className="text-lg font-medium text-gray-700">
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
