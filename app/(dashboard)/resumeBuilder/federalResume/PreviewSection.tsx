import React from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import Summary from "./preview/Summary";

export default function PreviewSectionPage() {
  return (
    <>
      {" "}
      <section className="bg-gray-100 p-3 shadow rounded-lg">
        <div className="relative shadow-lg h-full p-6 border-t-[20px] border-t-blue-900 rounded-t">
          {/* PREVIEW SECTIONS */}
          <div className="space-y-6">
            <PersonalDetailPreview />
            <Summary />
          </div>
        </div>
      </section>
    </>
  );
}
