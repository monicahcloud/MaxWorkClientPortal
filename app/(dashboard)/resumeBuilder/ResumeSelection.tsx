"use client";
import { resumeTemplates } from "./ResumeTemplate";
import ResumeTemplateCard from "./ResumeTempleCard";

const ResumeSelection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full">
      {resumeTemplates.map((template, index) => (
        <ResumeTemplateCard key={index} template={template} />
      ))}
    </div>
  );
};

export default ResumeSelection;
