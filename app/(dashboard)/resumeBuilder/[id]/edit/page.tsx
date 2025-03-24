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

function EditResume() {
  const { getToken } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeType, setResumeType] = useState<string | null>(null); // Store resume type

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

        if (!response.ok) {
          throw new Error("Failed to fetch resume data");
        }

        const resumeData = await response.json();

        // Update context state with fetched data
        setPersonalInfo(resumeData.personalInfo);
        setSummary(resumeData.summary);
        setExperiences(resumeData.experiences);
        setEducation(resumeData.education);
        setSkills(resumeData.skills);
        setCertifications(resumeData.certifications);
        setAchievements(resumeData.achievements);
        setImage(resumeData.image);
        setResumeType(resumeData.resumeType); // Set resume type

        setLoading(false);
      } catch (err) {
        console.error("Error fetching resume data:", err);
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
          resumeType: resumeType, // Send resume type back to the api.
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update resume data");
      }

      setLoading(false);
      router.push(`/resumeBuilder/${params.id}`); // Redirect to resume view page
    } catch (err) {
      console.error("Error updating resume data:", err);
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderForm = () => {
    switch (resumeType) {
      case "chronological":
        return <ChronologicalFormSection />;
      case "functional":
        return <FunctionalFormPage />;
      // Add cases for other templates
      default:
        return <ChronologicalFormSection />; // Default to chronological if resumeType is not set
    }
  };

  const renderPreview = () => {
    switch (resumeType) {
      case "chronological":
        return <ChronologicalPreviewSection />;
      case "functional":
        return <FunctionalPreviewPage />;
      // Add cases for other templates
      default:
        return <ChronologicalPreviewSection />; // Default to chronological if resumeType is not set
    }
  };

  return (
    <ResumeBuilderProvider>
      <div className="w-full justify-center gap-10 lg:px-5 2xl:px-10 py-4 grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6 flex items-center flex-col gap-4 px-2">
          <h1 className="text-3xl font-bold tracking-wide ">
            Edit Your Resume
          </h1>
          {renderForm()}
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded">
            Save Changes
          </button>
        </div>
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
          {renderPreview()}
        </div>
      </div>
    </ResumeBuilderProvider>
  );
}

export default EditResume;
