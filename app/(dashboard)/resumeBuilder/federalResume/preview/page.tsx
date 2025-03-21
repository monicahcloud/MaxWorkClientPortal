import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Summary from "./Summary";
import PersonalDetailsPreview from "./Summary";

export default function PreviewSection() {
  return (
    <div>
      {/* Personal Detail */}
      <PersonalDetailsPreview />
      {/* Summary */}
      <Summary />
      {/* Professional Experience */}
      <Experience />
      {/* Education */}
      <Education />
      {/* Skills */}
      <Skills />
    </div>
  );
}
