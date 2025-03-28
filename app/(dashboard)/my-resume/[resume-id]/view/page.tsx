"use client";
import ChronologicalPreviewSection from "@/app/components/chronologicalResume/preview/ChronologicalPreviewSection";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { RWebShare } from "react-web-share";

interface ResumeInfo {
  firstName: string;
  lastName: string;
  // Add other properties as needed
}

const ViewResumePage = () => {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const params = useParams();
  const resumeId = params["resume-id"];
  const {
    personalInfo,
    summary,
    experiences,
    education,
    skills,
    certifications,
  } = useResumeBuilder();

  const HandleDownload = () => {
    window.print();
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <div>
      <div id="no-print">
        <div className="">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Resume is ready.
          </h2>
          <p className="text-center text-gray-500">
            Now you are ready to download your resume and you can share a unique
            url with your friends and family.
          </p>
          <div className="flex justify-between px-44 my-10  no-print-section">
            <Button onClick={HandleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open url to see it",
                url: `${baseUrl}/my-resume/${resumeId}/view`,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
              }}
              onClick={() => console.log("shared successfully!")}>
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36 ">
        <ChronologicalPreviewSection
          personalInfo={personalInfo}
          summary={summary}
          experiences={experiences}
          education={education}
          skills={skills}
          certifications={certifications}
        />
      </div>
    </div>
  );
};

export default ViewResumePage;
