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
  id?: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  department: string;
  email: string;
  phone: string;
  website: string;
  themeColor?: string;
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  dateRange?: string;
  duties: string;
  responsibilities: string;
  accomplishments: string;
  status: string;
  clearance: string;
  grade: string;
  time: string;
  description?: string;
}

export interface Education {
  id?: string;
  school: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  dateRange?: string;
  description?: string;
}

export interface Skill {
  id?: string;
  name: string;
  level: string;
  description?: string;
}

export interface Certification {
  id?: string;
  title: string;
  issuer: string;
  issueDate: Date;
  expirationDate: Date | undefined;
  credentialId: string | undefined;
  credentialUrl: string | undefined;
  dateRange?: string;
  description?: string;
}

export interface Achievement {
  id?: string;
  title: string;
  description: string;
  date: Date;
  dateRange?: string;
}

export interface Summary {
  id?: string;
  text: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  thumbnailUrl: string;
  image?: string; // base64 or file URL string representation
  personalInfo?: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  achievements: Achievement[];
  summary?: Summary;
  resumeType?: string;
  themeColor?: string;
}

export interface ResumeBuilderContextType {
  personalInfo: PersonalInfo;
  setPersonalInfo: Dispatch<SetStateAction<PersonalInfo>>;
  summary: Summary | null;
  setSummary: Dispatch<SetStateAction<Summary | null>>;
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
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  resumeType: string | null;
  setResumeType: Dispatch<SetStateAction<string | null>>;
  themeColor: string | null;
  setThemeColor: Dispatch<SetStateAction<string | null>>;
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
  summary: null,
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
  image: null,
  setImage: () => {},
  resumeType: null,
  setResumeType: () => {},
  themeColor: null,
  setThemeColor: () => {},
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
  const [summary, setSummary] = useState<Summary | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [resumeType, setResumeType] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState<string | null>(null);

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
        image,
        setImage,
        resumeType,
        setResumeType,
        themeColor,
        setThemeColor,
      }}>
      {children}
    </ResumeBuilderContext.Provider>
  );
};

// 5️⃣ Hook
export const useResumeBuilder = () => useContext(ResumeBuilderContext);
