"use client";

import React, { createContext, useContext, useState } from "react";

// Define the shape of the resume data
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

interface ResumeBuilderContextType {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
}

// Default values
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

export const ResumeBuilderContext = createContext<ResumeBuilderContextType>({
  personalInfo: defaultPersonalInfo,
  setPersonalInfo: () => {},
});

// Context Provider
export const ResumeBuilderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfo>(defaultPersonalInfo);

  return (
    <ResumeBuilderContext.Provider value={{ personalInfo, setPersonalInfo }}>
      {children}
    </ResumeBuilderContext.Provider>
  );
};

// Hook for easy usage
export const useResumeBuilder = () => useContext(ResumeBuilderContext);
