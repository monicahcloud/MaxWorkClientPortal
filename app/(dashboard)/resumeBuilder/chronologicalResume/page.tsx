"use client";

import React from "react";
import ChronologicalPreviewSection from "../chronologicalResume/preview/page";
import ChronologicalFormSection from "../chronologicalResume/forms/page";

function ChronologicalResume() {
  return (
    <div className="w-full px-4 lg:px-8 2xl:px-12 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Chronological Resume Builder
      </h1>

      {/* Grid layout for form + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 📋 Form Section */}
        <ChronologicalFormSection />
        {/* 🖼️ Preview Section */}
        <ChronologicalPreviewSection />
      </div>
    </div>
  );
}

export default ChronologicalResume;
