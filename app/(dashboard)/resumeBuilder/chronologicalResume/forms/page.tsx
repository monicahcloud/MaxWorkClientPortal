"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import PersonDetailForm from "./PersonDetailForm";
import SummaryForm from "./SummaryForm";
import Experience from "./ExperienceForm";
import EducationComponent from "./EducationComponent";
import SkillsComponent from "./SkillsComponent";
import CertificationComponent from "./CertificationComponent";

export default function ChronologicalFormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnabledNext] = useState(false);

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
          <Button
            disabled={!enableNext}
            size="sm"
            onClick={goToNext}
            className="flex gap-2">
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* FORM SECTIONS */}
      {activeFormIndex === 1 && (
        <PersonDetailForm onComplete={() => setEnabledNext(true)} />
      )}
      {activeFormIndex === 2 && (
        <SummaryForm onComplete={() => setEnabledNext(true)} />
      )}
      {activeFormIndex === 3 && (
        <Experience onComplete={() => setEnabledNext(true)} />
      )}
      {activeFormIndex === 4 && (
        <EducationComponent onComplete={() => setEnabledNext(true)} />
      )}
      {activeFormIndex === 6 && <SkillsComponent />}
      {activeFormIndex === 5 && <CertificationComponent />}
    </div>
  );
}
