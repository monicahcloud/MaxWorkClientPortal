"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "@clerk/nextjs";
import FormSection from "../FormSection";
import PreviewSection from "../PreviewSection";
import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";

export type Experience = {
  id: number;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  workSummary: string;
};

export type Education = {
  id: number;
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description: string;
};

export type ResumeInfo = {
  id: string;
  clerkId: string;
  resumeTitle: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  themeColor?: string;
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
};
export type Skill = {
  id: number;
  name: string;
  rating: number;
};

function ResumeBuilder() {
  const { getToken, isSignedIn, userId } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      console.log("ResumeBuilder: Fetching resume..."); //log start of fetch.
      if (!isSignedIn || !userId || !params.id) {
        console.log("ResumeBuilder: Not signed in or invalid params.");
        setLoading(false);
        return;
      }

      try {
        const token = await getToken({ template: "backend" });
        if (!token) {
          console.error("ResumeBuilder: Clerk token not found");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/resumes/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          console.error(
            `ResumeBuilder: Failed to fetch resume: ${response.status}`
          );
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("ResumeBuilder: API Response:", data);

        setResumeInfo(data);
        console.log("ResumeBuilder: Updated resumeInfo state:", data);
      } catch (error) {
        console.error("ResumeBuilder: Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [getToken, isSignedIn, userId, params.id]);

  if (loading) {
    console.log("ResumeBuilder: Loading...");
    return <p className="text-center text-gray-500">Loading resume...</p>;
  }

  if (!resumeInfo) {
    console.log("ResumeBuilder: resumeInfo is null or undefined.");
    return <p className="text-center text-red-500">Resume not found</p>;
  }

  console.log("ResumeBuilder: resumeInfo is present:", resumeInfo);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="w-full px-4 lg:px-5 2xl:px-10 py-4 grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6 flex items-center flex-col gap-4 px-2">
          <FormSection />
        </div>
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
          <PreviewSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ResumeBuilder;
