"use client";

import React, { Suspense } from "react";
import PreviewSectionPage from "./PreviewSection";
import FormSectionPage from "./FormSectionPage";

function FederalResume() {
  return (
    <div className="w-full px-4 lg:px-8 2xl:px-12 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Federal Resume Builder
      </h1>

      {/* Grid layout for form + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 📋 Form Section */}
        <Suspense fallback={<div>Loading form...</div>}>
          <FormSectionPage />
        </Suspense>

        {/* 🖼️ Preview Section */}
        <Suspense fallback={<div>Loading preview...</div>}>
          <PreviewSectionPage />
        </Suspense>
      </div>
    </div>
  );
}

export default FederalResume;
