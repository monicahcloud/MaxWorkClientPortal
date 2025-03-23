import React from "react";
import { Button } from "@/components/ui/button";
import { Resume } from "@/app/context/ResumeBuilderContext";

interface ResumeThumbnailProps {
  resume: Resume;
  onEdit: (resumeId: string) => void;
  onDetails: (resumeId: string) => void;
}

function ResumeThumbnail({ resume, onEdit, onDetails }: ResumeThumbnailProps) {
  return (
    <div className="border rounded-md shadow p-4">
      <div className="bg-gray-200 w-200 h-150 rounded-md flex flex-col items-start justify-center p-2">
        <h2 className="text-lg font-semibold">{resume.thumbnailData?.name}</h2>
        <p className="text-sm">{resume.thumbnailData?.jobTitle}</p>
        {resume.thumbnailData?.experience && (
          <ul>
            {resume.thumbnailData.experience.map((role, index) => (
              <li key={index} className="text-xs">
                {role}
              </li>
            ))}
          </ul>
        )}
      </div>
      <h2 className="text-lg font-semibold mt-2">{resume.title}</h2>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={() => onEdit(resume.id)}>
          Edit
        </Button>
        <Button onClick={() => onDetails(resume.id)}>Details</Button>
      </div>
    </div>
  );
}

export default ResumeThumbnail;
