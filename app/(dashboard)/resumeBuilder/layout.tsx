import { ResumeBuilderProvider } from "@/app/context/ResumeBuilderContext";
import React from "react";

const ResumeBuilderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResumeBuilderProvider>
      <main id="resume-builder" className="w-full px-4 lg:px-8 2xl:px-12 py-8">
        <div className="mt-10">{children}</div>
      </main>
    </ResumeBuilderProvider>
  );
};

export default ResumeBuilderLayout;
