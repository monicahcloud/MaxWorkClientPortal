"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserResumes } from "@/utils/actions";
import ResumeThumbnail from "./ResumeThumbnail";

export default function Resumes() {
  const {
    data: resumes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userResumes"],
    queryFn: getUserResumes,
  });

  if (isLoading) return <p>Loading resumes...</p>;
  if (error) return <p>Error loading resumes</p>;

  const handleEdit = (resumeId: string) => {
    window.location.href = `/resume?resumeId=${resumeId}`;
  };

  const handleDetails = (resumeId: string) => {
    window.location.href = `/resume/details?resumeId=${resumeId}`;
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resumes</h2>

      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
          {resumes?.map((resume) => (
            <ResumeThumbnail
              key={resume.id}
              resume={resume}
              onEdit={handleEdit}
              onDetails={handleDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
