// components/chronologicalResume/forms/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import PersonDetailForm from "./PersonDetailForm";
import SummaryForm from "./SummaryForm";
import Experience from "./ExperienceForm";
import EducationComponent from "./EducationComponent";
import SkillsComponent from "./SkillsComponent";
import CertificationComponent from "./CertificationComponent";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import ResumeCompletion from "../../resumesComponents/ResumeCompletion";

interface ChronologicalFormSectionProps {
  resumeId: string;
}

export default function ChronologicalFormSection({
  resumeId,
}: ChronologicalFormSectionProps) {
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
  } = useResumeBuilder();

  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnabledNext] = useState(false);

  useEffect(() => {
    // Enable next if the current form has data
    if (activeFormIndex === 1 && personalInfo) setEnabledNext(true);
    if (activeFormIndex === 2 && summary) setEnabledNext(true);
    if (activeFormIndex === 3 && experiences && experiences.length > 0)
      setEnabledNext(true);
    if (activeFormIndex === 4 && education && education.length > 0)
      setEnabledNext(true);
    if (activeFormIndex === 5 && certifications && certifications.length > 0)
      setEnabledNext(true);
    if (activeFormIndex === 6 && skills && skills.length > 0)
      setEnabledNext(true);
  }, [
    activeFormIndex,
    personalInfo,
    summary,
    experiences,
    education,
    certifications,
    skills,
  ]);

  const goToNext = () => setActiveFormIndex((prev) => prev + 1);
  const goToPrev = () => setActiveFormIndex((prev) => prev - 1);

  return (
    <div className="w-full mx-auto items-center">
      <div className="flex justify-between w-full items-center mb-4">
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button size="sm" onClick={goToPrev} className="flex gap-2">
              <ArrowLeft /> Previous
            </Button>
          )}
          {activeFormIndex < 7 && (
            <Button
              disabled={!enableNext}
              size="sm"
              onClick={goToNext}
              className="flex gap-2">
              Next <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {/* FORM SECTIONS */}
      {activeFormIndex === 1 && (
        <PersonDetailForm
          onComplete={() => setEnabledNext(true)}
          resumeId={resumeId}
        />
      )}

      {activeFormIndex === 2 && (
        <SummaryForm
          onComplete={() => setEnabledNext(true)}
          resumeId={resumeId}
        />
      )}
      {activeFormIndex === 3 && (
        <Experience
          onComplete={() => setEnabledNext(true)}
          resumeId={resumeId}
        />
      )}
      {activeFormIndex === 4 && (
        <EducationComponent
          onComplete={() => setEnabledNext(true)}
          resumeId={resumeId}
        />
      )}
      {activeFormIndex === 5 && (
        <CertificationComponent
          onComplete={() => setEnabledNext(true)}
          resumeId={resumeId}
        />
      )}
      {activeFormIndex === 6 && (
        <SkillsComponent
          onComplete={() => setEnabledNext(true)}
          resumeId={resumeId}
        />
      )}

      {activeFormIndex === 7 && (
        <ResumeCompletion onComplete={() => setEnabledNext(false)} />
      )}
    </div>
  );
}
