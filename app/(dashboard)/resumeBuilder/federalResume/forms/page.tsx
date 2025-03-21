import React, { useState, useContext } from "react";
import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summary from "./Summary";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import PersonalDetailsForm from "./PersonalDetailsForm";

export default function FormSection() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnabledNext] = useState(false);

  if (resumeInfo) {
    //add logs for any other data being used.
  }
  return (
    <div className="w-full mx-auto items-center">
      <div className="flex justify-between w-full items-center">
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              className="flex gap-2"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft /> Previous
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2 "
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}>
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Detail */}
      {activeFormIndex == 1 ? <PersonalDetailsForm /> : null}
      {/* Summary */}
      {activeFormIndex == 2 ? <Summary /> : null}
      {/* Professional Experience */}
      {activeFormIndex == 3 ? <Experience /> : null}
      {/* Education */}
      {activeFormIndex == 4 ? <Education /> : null}
      {/* Skills */}
      {activeFormIndex == 5 ? <Skills /> : null}
    </div>
  );
}
