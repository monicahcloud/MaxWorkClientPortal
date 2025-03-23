"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// 1️⃣ Define types
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  department: string;
  email: string;
  phone: string;
  website: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  duties: string;
  responsibilities: string;
  accomplishments: string;
  status: string;
  clearance: string;
  grade: string;
  time: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate: Date;
  expirationDate: Date | undefined;
  credentialId: string | undefined;
  credentialUrl: string | undefined;
}

export interface Achievement {
  title: string;
  description: string;
  date: Date;
}

export interface Resume {
  id: string;
  title: string;
  thumbnailUrl: string;
  // Add other properties as needed
}

export interface ResumeBuilderContextType {
  personalInfo: PersonalInfo;
  setPersonalInfo: Dispatch<SetStateAction<PersonalInfo>>;
  summary: string;
  setSummary: Dispatch<SetStateAction<string>>;
  experiences: Experience[];
  setExperiences: Dispatch<SetStateAction<Experience[]>>;
  education: Education[];
  setEducation: Dispatch<SetStateAction<Education[]>>;
  skills: Skill[];
  setSkills: Dispatch<SetStateAction<Skill[]>>;
  certifications: Certification[];
  setCertifications: Dispatch<SetStateAction<Certification[]>>;
  achievements: Achievement[];
  setAchievements: Dispatch<SetStateAction<Achievement[]>>;
}

// 2️⃣ Default state
const defaultPersonalInfo: PersonalInfo = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  address: "",
  department: "",
  email: "",
  phone: "",
  website: "",
};

const defaultContext: ResumeBuilderContextType = {
  personalInfo: defaultPersonalInfo,
  setPersonalInfo: () => {},
  summary: "",
  setSummary: () => {},
  experiences: [],
  setExperiences: () => {},
  education: [],
  setEducation: () => {},
  skills: [],
  setSkills: () => {},
  certifications: [],
  setCertifications: () => {},
  achievements: [],
  setAchievements: () => {},
};

// 3️⃣ Create Context
const ResumeBuilderContext =
  createContext<ResumeBuilderContextType>(defaultContext);

// 4️⃣ Provider
export const ResumeBuilderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfo>(defaultPersonalInfo);
  const [summary, setSummary] = useState<string>("");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  return (
    <ResumeBuilderContext.Provider
      value={{
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
      }}>
      {children}
    </ResumeBuilderContext.Provider>
  );
};

// 5️⃣ Hook
export const useResumeBuilder = () => useContext(ResumeBuilderContext);
