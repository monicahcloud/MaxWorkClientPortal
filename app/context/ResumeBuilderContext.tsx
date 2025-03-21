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

export interface ResumeBuilderContextType {
  personalInfo: PersonalInfo;
  setPersonalInfo: Dispatch<SetStateAction<PersonalInfo>>;
  summary: string;
  setSummary: Dispatch<SetStateAction<string>>;
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

  return (
    <ResumeBuilderContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        summary,
        setSummary,
      }}>
      {children}
    </ResumeBuilderContext.Provider>
  );
};

// 5️⃣ Hook
export const useResumeBuilder = () => useContext(ResumeBuilderContext);
