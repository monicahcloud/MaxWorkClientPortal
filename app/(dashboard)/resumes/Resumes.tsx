// "use client" directive is required for components that use hooks like useQuery.
// This ensures the component runs on the client side.
"use client";

import AddResume from "./AddResume";
import { useQuery } from "@tanstack/react-query";
import { getUserResumes } from "@/utils/actions";
import ResumeCard from "./ResumeCard";

export default function Resumes() {
  // Fetching user-specific resumes using React Query
  const {
    data: resumes, // Stores the fetched resumes
    isLoading, // Indicates if the request is still loading
    error, // Stores any error encountered during the fetch
  } = useQuery({
    queryKey: ["userResumes"], // Unique key for caching and refetching data
    queryFn: getUserResumes, // Function to fetch resumes from the backend
  });

  // Display a loading message while fetching resumes
  if (isLoading) return <p>Loading resumes...</p>;

  // Show an error message if the fetch fails
  if (error) return <p>Error loading resumes</p>;

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resumes</h2>
      <p>Start Creating AI Resume for your next Job.</p>
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5 ">
          {/* Component to add a new resume */}
          <AddResume />

          {/* Display list of user resumes */}
          {resumes?.map((resume, index) => (
            <>
              <ResumeCard resume={resume} key={index} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
