"use client";

import React, { useState, useContext } from "react";
import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";

import Summary from "./Summary";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import PersonalDetailsForm from "./PersonalDetailsForm"; // ✅ This is imported, not declared here

export default function FormSection() {
  const { resumeInfo } = useContext(ResumeInfoContext);
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
        <PersonalDetailsForm onComplete={() => setEnabledNext(true)} />
      )}
      {activeFormIndex === 2 && (
        <Summary onComplete={() => setEnabledNext(true)} />
      )}
      {activeFormIndex === 3 && <Experience />}
      {activeFormIndex === 4 && <Education />}
      {activeFormIndex === 5 && <Skills />}
    </div>
  );
}
