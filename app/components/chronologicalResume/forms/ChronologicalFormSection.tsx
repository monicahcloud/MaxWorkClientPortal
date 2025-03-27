"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import PersonDetailForm from "@/app/(dashboard)/resumeBuilder/chronologicalResume/forms/PersonDetailForm";
import SummaryForm from "@/app/(dashboard)/resumeBuilder/chronologicalResume/forms/SummaryForm";
import Experience from "@/app/(dashboard)/resumeBuilder/chronologicalResume/forms/ExperienceForm";
import EducationComponent from "@/app/(dashboard)/resumeBuilder/chronologicalResume/forms/EducationComponent";
import CertificationComponent from "@/app/(dashboard)/resumeBuilder/chronologicalResume/forms/CertificationComponent";
import SkillsComponent from "@/app/(dashboard)/resumeBuilder/chronologicalResume/forms/SkillsComponent";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ChronologicalFormSectionProps {
  resumeId: string;
  resumeTitle: string;
}

export default function ChronologicalFormSection({
  resumeId,
  resumeTitle,
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
  const router = useRouter();

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
        <div className="flex gap-5">
          <Link href={"/home"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="flex gap-2">
            <LayoutGrid /> Theme
          </Button>
        </div>
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
        <Button onClick={() => router.push(`/my-resume/${resumeId}/view`)}>
          View Resume
        </Button>
      )}
    </div>
  );
}
