// Importing necessary icon from lucide-react
import { Notebook } from "lucide-react";
import Link from "next/link";

// Defining the types for the props, specifying that 'resume' is an object with a 'title' string
type ResumeCardProps = {
  resume: {
    resumeTitle: string; // The title of the resume, which is a string
    id: string;
  };
};

// Functional component ResumeCard that takes 'resume' as a prop
function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <Link href={`/resumes/${resume.id}/edit`}>
      {/* Card container with padding and background style */}
      <div className="p-14 bg-secondary  flex items-center justify-center border rounded-lg border-primary h-[280px] hover:scale-105 transion-all hover:shadow-md shadow-primary">
        {/* Displaying the Notebook icon */}
        <Notebook />
      </div>
      {/* Rendering the title of the resume */}
      <h2 className="text-center my-1 ">{resume.resumeTitle}</h2>
    </Link>
  );
}

export default ResumeCard;
