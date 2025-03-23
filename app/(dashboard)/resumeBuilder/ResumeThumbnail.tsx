import React from "react";
import Image from "next/image";
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
      {resume.thumbnailUrl ? (
        <Image
          src={resume.thumbnailUrl}
          alt={`Thumbnail of ${resume.title}`}
          width={200}
          height={150}
          className="rounded-md"
        />
      ) : (
        <div className="bg-gray-200 w-200 h-150 rounded-md flex items-center justify-center">
          No Thumbnail
        </div>
      )}
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
