"use client";

import React, { useState } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import Experience from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";
import CertificationPreview from "./preview/CertificationPreview";
import SkillPreview from "./preview/SkillsPreview";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext"; // Import useResumeBuilder

export default function PreviewSectionPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeTitle = searchParams.get("resumeTitle");
  const {
    personalInfo,
    summary,
    experiences,
    education,
    certifications,
    skills,
  } = useResumeBuilder(); // Get data from context.

  const handleCreateResume = async () => {
    setLoading(true);
    try {
      // 1. Get all the data from the context.
      const personalDetails = personalInfo;
      const summaryData = summary;
      const experiencesData = experiences;
      const educationData = education;
      const certificationsData = certifications;
      const skillsData = skills;
      console.log("Context data:", {
        personalInfo,
        summary,
        experiences,
        education,
        certifications,
        skills,
        resumeTitle,
      });
      // 2. Make the API call to create the resume
      const response = await fetch("/api/create-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalDetails: personalDetails,
          summary: summaryData,
          experiences: experiencesData,
          education: educationData,
          certifications: certificationsData,
          skills: skillsData,
          resumeTitle: resumeTitle, // Send resumeTitle to the backend
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create resume.");
      }

      // 3. Handle the successful response
      toast.success("Resume created successfully!");
      router.push("/resumes"); // Redirect to the resumes page
    } catch (error: any) {
      toast.error(error.message || "Failed to create resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-100 p-3 shadow rounded-lg">
        <div className="relative shadow-lg h-full p-6 border-t-[20px] border-t-blue-900 rounded-t">
          {/* PREVIEW SECTIONS */}
          <div className="space-y-6">
            <PersonalDetailPreview />
            <SummaryPreview />
            <Experience />
            <EducationPreview />
            <CertificationPreview />
            <SkillPreview />
          </div>
          {/* Create Resume Button */}
          <div className="flex justify-center mt-6">
            <Button onClick={handleCreateResume} disabled={loading}>
              {loading ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Create Resume
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
