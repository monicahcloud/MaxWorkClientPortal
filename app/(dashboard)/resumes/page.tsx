"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Notebook } from "lucide-react"; // Assuming you have lucide-react installed
import Image from "next/image";
export default function ResumesPage() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    async function fetchResumes() {
      try {
        const response = await fetch("/api/resumes");
        if (!response.ok) {
          throw new Error("Failed to fetch resumes.");
        }
        const data = await response.json();
        console.log("Resumes data:", data);
        setResumes(data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    }
    fetchResumes();
  }, []);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resumes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        {resumes.map((resume) => (
          <Link key={resume.id} href={`/resumes/${resume.id}/edit`}>
            {/* Card container with padding and background style */}
            <div className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center justify-center border rounded-lg border-primary h-[280px] hover:scale-105 transition-all hover:shadow-md shadow-primary">
              {/* Displaying the title on top of the logo */}
              <h2 className="text-center text-xl my-2">{resume.title}</h2>
              <Image
                priority
                src="/fedlogo.png"
                alt="thumbnail"
                width={100}
                height={100}
                objectFit="contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
