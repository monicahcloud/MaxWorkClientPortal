"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";
import dummy from "@/utils/dummy";
import FormSection from "../../FormSection";
import PreviewSection from "../../PreviewSection";

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

function EditResume() {
  const { getToken, isSignedIn, userId } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [resumeInfo, setResumeInfo] = useState(dummy);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("EditResume Params", params);
    setResumeInfo(dummy);
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="w-full justify-center gap-10 lg:px-5 2xl:px-10 py-4 grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6 flex items-center flex-col gap-4 px-2">
          <h1 className="text-3xl font-bold tracking-wide ">
            Build Your Resume
          </h1>
          <FormSection />
        </div>
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
          <PreviewSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
