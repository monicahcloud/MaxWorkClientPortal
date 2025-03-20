import { createContext, useState, ReactNode } from "react";

interface ResumeInfo {
  themeColor?: string;
  id: string;
  clerkId: string;
  resumeTitle: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface ResumeInfoContextType {
  resumeInfo: ResumeInfo | null;
  setResumeInfo: (resume: ResumeInfo | null) => void;
}

export const ResumeInfoContext = createContext<ResumeInfoContextType>({
  resumeInfo: null,
  setResumeInfo: () => {},
});

export function ResumeInfoProvider({ children }: { children: ReactNode }) {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
}
