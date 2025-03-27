"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  ResumeBuilderProvider,
  useResumeBuilder,
} from "@/app/context/ResumeBuilderContext";
import ChronologicalFormSection from "../../chronologicalResume/forms/page";
import ChronologicalPreviewSection from "../../chronologicalResume/preview/page";
import FunctionalFormPage from "../../functionalResume/forms/page";
import FunctionalPreviewPage from "../../functionalResume/preview/page";
// Import other form and preview components for different templates
import CombinationFormPage from "../../functionalResume/preview/page";
import CombinationPreviewPage from "../../functionalResume/preview/page";
import FederalFormPage from "../../federalResume/forms/page";
import FederalPreviewPage from "../../federalResume/PreviewSection";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const EditResumeWrapper = () => (
  <ResumeBuilderProvider>
    <EditResume />
  </ResumeBuilderProvider>
);

export default EditResumeWrapper;

function EditResume() {
  const { getToken } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeType, setResumeType] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<any>(null);

  const {
    personalInfo,
    setPersonalInfo,
    summary,
    setSummary,
    experiences,
    setExperiences,
    education,
    setEducation,
    skills,
    setSkills,
    certifications,
    setCertifications,
    achievements,
    setAchievements,
    image,
    setImage,
  } = useResumeBuilder();

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const token = await getToken();

        const response = await fetch(`/api/resumes/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch resume data");

        const data = await response.json();
        setResumeData(data);

        console.log("✅ Fetched Resume Data:", data);

        // Populate context
        setPersonalInfo(data.personalInfo);
        setSummary(data.summary);
        setExperiences(data.experiences);
        setEducation(data.education);
        setSkills(data.skills);
        setCertifications(data.certifications);
        setAchievements(data.achievements);
        setImage(data.image);
        setResumeType(data.resumeType);

        setLoading(false);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [
    params.id,
    getToken,
    setPersonalInfo,
    setSummary,
    setExperiences,
    setEducation,
    setSkills,
    setCertifications,
    setAchievements,
    setImage,
  ]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch(`/api/resumes/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          personalInfo,
          summary,
          experiences,
          education,
          skills,
          certifications,
          achievements,
          image,
          resumeType,
        }),
      });

      if (!response.ok) throw new Error("Failed to update resume data");

      toast.success("Resume saved successfully!");
      router.push(`/resumeBuilder/${params.id}`);
    } catch (err: any) {
      console.error("Save error:", err);
      toast.error(err.message || "Something went wrong while saving.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderForm = () => {
    switch (resumeType) {
      case "chronological":
        return <ChronologicalFormSection resumeId={params.id as string} />;
      case "functional":
        return <FunctionalFormPage resumeId={params.id as string} />;
      case "combination":
        return <CombinationFormPage resumeId={params.id as string} />;
      case "federal":
        return <FederalFormPage resumeId={params.id as string} />;
      default:
        return <ChronologicalFormSection resumeId={params.id as string} />;
    }
  };

  const renderPreview = () => {
    switch (resumeType) {
      case "chronological":
        return <ChronologicalPreviewSection resumeData={resumeData} />;
      case "functional":
        return <FunctionalPreviewPage resumeData={resumeData} />;
      case "combination":
        return <CombinationPreviewPage resumeData={resumeData} />;
      case "federal":
        return <FederalPreviewPage resumeData={resumeData} />;
      default:
        return <ChronologicalPreviewSection resumeData={resumeData} />;
    }
  };

  return (
    <div className="w-full justify-center gap-10 lg:px-5 2xl:px-10 py-4 grid grid-cols-1 lg:grid-cols-12">
      <div className="col-span-12 lg:col-span-6 2xl:col-span-6 flex items-center flex-col gap-4 px-2">
        <h1 className="text-3xl font-bold tracking-wide ">Edit Your Resume</h1>

        {renderForm()}

        <Button
          onClick={handleSave}
          disabled={loading}
          className={`bg-slate-900 text-white px-4 py-2 rounded flex items-center justify-center gap-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}>
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
        {renderPreview()}
      </div>
    </div>
  );
}
