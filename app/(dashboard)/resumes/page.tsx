"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

type Resume = {
  id: string;
  title: string;
  resumeType?: string;
  createdAt?: string;
  // add other properties as needed
};

export default function ResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);

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
          <Link key={resume.id} href={`/resumeBuilder/${resume.id}/edit`}>
            {/* Card container with padding and background style */}
            <div className=" border-t-red-700 border-8 p-14 bg-gradient-to-b from-red-400 via-white to-black flex flex-col items-center justify-center rounded-lg border-primary h-[280px] hover:scale-105 transition-all hover:shadow-md shadow-primary">
              {/* Displaying the title on top of the logo */}
              <Image
                priority
                src="/MaxWorkLogo.png"
                alt="thumbnail"
                width={150}
                height={150}
                objectFit="contain"
              />{" "}
              <h2 className="text-center text-md font-bold my-2">
                {resume.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
