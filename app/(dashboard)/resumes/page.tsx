"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2Icon, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

type Resume = {
  id: string;
  title: string;
  resumeType?: string;
  createdAt?: string;
};

export default function ResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [resumeToDeleteId, setResumeToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResumes() {
      try {
        const response = await fetch("/api/resumes");
        if (!response.ok) {
          throw new Error("Failed to fetch resumes.");
        }
        const data = await response.json();
        setResumes(data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    }
    fetchResumes();
  }, []);

  const onDelete = async () => {
    setLoading(true);
    try {
      if (resumeToDeleteId) {
        console.log("Deleting resume with ID:", resumeToDeleteId); // Add this line
        const response = await fetch(`/api/resumes/${resumeToDeleteId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete resume.");
        }
        setResumes((prevResumes) =>
          prevResumes.filter((resume) => resume.id !== resumeToDeleteId)
        );
        toast.success("Resume deleted");
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume.");
    } finally {
      setLoading(false);
      setOpenAlert(false);
      setResumeToDeleteId(null);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/resumeBuilder/${id}/edit`);
  };

  const handleView = (id: string) => {
    router.push(`/my-resume/${id}/view`);
  };

  const handleDownload = (id: string) => {
    toast.success("Download started");
    console.log(`Download resume with id: ${id}`);
  };

  const handleDeleteClick = (id: string) => {
    console.log("handleDeleteClick called with ID:", id); // Add this line
    setResumeToDeleteId(id);
    setOpenAlert(true);
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resumes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        {resumes.map((resume) => (
          <div key={resume.id}>
            <Link href={`/resumeBuilder/${resume.id}/edit`}>
              <div className=" border-t-red-700 border-t-8 p-14 bg-gradient-to-b from-red-400 via-white to-black flex flex-col items-center justify-center rounded-t-lg h-[280px] hover:scale-105 transition-all hover:shadow-md shadow-primary">
                <div className="items-center flex justify-center">
                  <Image
                    priority
                    src="/MaxWorkLogo.png"
                    alt="thumbnail"
                    width={150}
                    height={150}
                    objectFit="contain"
                  />
                </div>
              </div>
            </Link>
            <div className="p-3 justify-between flex text-white bg-red-700 rounded-b-md">
              <h2 className="text-center text-md text-white ">
                {resume.title}
              </h2>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="h-4 w-4 cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEdit(resume.id)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleView(resume.id)}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(resume.id)}>
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(resume.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialog open={openAlert}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your resume.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={onDelete} disabled={loading}>
                        {loading ? (
                          <Loader2Icon className="animate-spin" />
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
