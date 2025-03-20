import React, { useState, useContext } from "react";
import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";

export default function FormSection() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnabledNext] = useState(false);

  console.log("FormSection data:", resumeInfo);
  if (resumeInfo) {
    console.log("FormSection firstName:", resumeInfo.firstName);
    //add logs for any other data being used.
  }
  return (
    <div>
      <div className="flex mx-3 justify-between items-center">
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
      {/* {activeFormIndex == 1 ? (
        <PersonalDetails enableNext={(v: boolean) => setEnabledNext(v)} />
      ) : null} */}
      {/* Summary */}
      {/* {activeFormIndex == 2 ? (
        <Summary enableNext={(v: boolean) => setEnabledNext(v)} />
      ) : null} */}
      {/* Professional Experience */}
      {/* {activeFormIndex == 3 ? <Experience /> : null} */}
      {/* Education */}
      {/* {activeFormIndex == 4 ? <Education /> : null} */}
      {/* Skills */}
      {/* {activeFormIndex == 5 ? <Skills /> : null} */}
    </div>
  );
}
