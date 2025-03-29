"use client";
import ChronologicalPreviewSection from "@/app/components/chronologicalResume/preview/ChronologicalPreviewSection";
import { pdf } from "@react-pdf/renderer";
import html2pdf from "html2pdf.js";

import {
  ResumeBuilderProvider,
  useResumeBuilder,
} from "@/app/context/ResumeBuilderContext";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import ChronologicalPDFDocument from "@/app/components/chronologicalResume/preview/ChronologicaPDFDocument";

interface ResumeInfo {
  firstName: string;
  lastName: string;
  // Add other properties as needed
}

const ViewResumeWrapper = () => (
  <ResumeBuilderProvider>
    <ViewResumePage />
  </ResumeBuilderProvider>
);

export default ViewResumeWrapper;

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
    setPersonalInfo,
    setSummary,
    setExperiences,
    setEducation,
    setSkills,
    setCertifications,
    setAchievements,
  } = useResumeBuilder();

  useEffect(() => {
    const fetchResumeData = async () => {
      console.log("Fetching resume data for resumeId:", resumeId);

      try {
        const response = await fetch(`/api/resumes/${resumeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch resume data");
        }
        const data = await response.json();
        console.log("Data from API:", data);

        // Update context with fetched data
        setPersonalInfo(data.personalInfo);
        setSummary(data.summary);
        setExperiences(data.experiences);
        setEducation(data.education);
        setSkills(data.skills);
        setCertifications(data.certifications);
        setAchievements(data.achievements);

        // Set resumeInfo for share
        setResumeInfo({
          firstName: data.personalInfo?.firstName || "",
          lastName: data.personalInfo?.lastName || "",
        });
      } catch (error: any) {
        toast.error(error.message || "Failed to load resume");
      }
    };

    if (resumeId) {
      fetchResumeData();
    }
  }, [
    resumeId,
    setPersonalInfo,
    setSummary,
    setExperiences,
    setEducation,
    setSkills,
    setCertifications,
    setAchievements,
  ]);

  const handleDownload = async () => {
    // const element = document.getElementById("print-area");

    // if (!element) {
    //   console.error("No print-area found!");
    //   return;
    // }

    // // Optional: scroll into view to force rendering if lazy-loaded
    // element.scrollIntoView({ behavior: "auto", block: "center" });

    // // Wait a moment to ensure rendering completes
    // setTimeout(() => {
    //   html2pdf()
    //     .set({
    //       margin: 0.5,
    //       filename: "Resume.pdf",
    //       html2canvas: { scale: 2, logging: true, useCORS: true },
    //       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    //     })
    //     .from(element)
    //     .save();
    // }, 100); // wait 100ms to ensure DOM settles
    const blob = await pdf(
      <ChronologicalPDFDocument
        personalInfo={personalInfo}
        summary={summary}
        experiences={experiences}
        education={education}
        skills={skills}
        certifications={certifications}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    link.click();
    URL.revokeObjectURL(url);
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
            <Button onClick={handleDownload}>Download</Button>
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
      <div></div>
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
