"use server";

import {
  JobType,
  CreateAndEditJobType,
  createAndEditJobSchema,
  createAndEditResumeSchema,
  ResumeInfo,
  CreateAndEditResumeType,
} from "./types";
import { redirect } from "next/navigation";
import { Prisma, UserResume } from "@prisma/client";
import { prisma } from "./prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

async function authenticateAndRedirect(): Promise<string> {
  const { userId } = await auth(); // Await the promise

  if (!userId) {
    redirect("/");
  }

  return userId;
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = await authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: {
        ...values,

        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = await authenticateAndRedirect();

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }
    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = await authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = await authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
  let job: JobType | null = null;
  const userId = await authenticateAndRedirect();

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    console.error(error);
    job = null;
  }
  if (!job) {
    redirect("/jobs");
  }
  return job;
}

export async function createResume(values: {
  resumeTitle: string;
  userName?: string; // Make userName optional
  userEmail?: string; // Make userEmail optional
}): Promise<ResumeInfo | null> {
  const userId = await authenticateAndRedirect();
  const user = await currentUser(); // Get the current Clerk user
  if (!userId) {
    console.error("❌ Authentication failed: No userId returned.");
    throw new Error("User not authenticated.");
  }

  console.log("✅ Clerk User ID:", userId); // Debugging log
  console.log("🚀 Creating resume with values:", values);
  createAndEditResumeSchema.parse(values);
  try {
    const resume: ResumeInfo = await prisma.userResume.create({
      data: {
        clerkId: userId,
        resumeTitle: values.resumeTitle,
        firstName: "",
        lastName: "",
        jobTitle: "",
        address: "",
        phone: "",
        email: "",
        userName: user?.fullName || "",
        userEmail: user?.emailAddresses[0]?.emailAddress || "",
      },
    });

    if (!resume || !resume.id) {
      console.error("❌ Prisma did not return an ID! Check database.");
      throw new Error("Resume creation failed: No ID returned.");
    }

    console.log("✅ Resume successfully created:", resume);
    return resume;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("🚨 Prisma Error Code:", error.code);
    }
    console.error("❌ Error creating resume:", error);
    throw new Error("Failed to create resume.");
  }
}

export async function getAllResumes() {
  try {
    const resumes = await prisma.userResume.findMany({
      orderBy: {
        createdAt: "desc", // Sort by newest first
      },
    });

    return resumes;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return [];
  }
}

// Function to fetch user-specific resumes
export async function getUserResumes() {
  const userId = await authenticateAndRedirect(); // Get the currently authenticated user
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const resumes = await prisma.userResume.findMany({
      where: {
        clerkId: userId, // Fetch only resumes belonging to the logged-in user
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return resumes;
  } catch (error) {
    console.error("Error fetching user resumes:", error);
    return [];
  }
}

export async function updateResume(resumeId: string, updatedData: any) {
  try {
    const updatedResume = await prisma.userResume.update({
      where: { id: resumeId },
      data: updatedData,
    });

    // ✅ Convert null values to undefined
    return Object.fromEntries(
      Object.entries(updatedResume).map(([key, value]) => [
        key,
        value === null ? undefined : value,
      ])
    );
  } catch (error) {
    console.error("❌ Prisma Error updating resume:", error);
    throw new Error("Failed to update resume");
  }
}

export async function getSingleResume(resumeId: string) {
  try {
    const resume = await prisma.userResume.findUnique({
      where: { id: resumeId },
    });

    return resume;
  } catch (error) {
    console.error("Error fetching single resume:", error);
    return null;
  }
}

// export async function updateResume(id: string, updatedData: any) {
//   console.log(`📌 Updating Resume ID: ${id} with Data:`, updatedData);

//   try {
//     const res = await fetch(`/resumes/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedData),
//     });

//     if (!res.ok) {
//       console.error("❌ API Error:", res.status, res.statusText);
//       throw new Error("Failed to update resume");
//     }

//     const data = await res.json();
//     console.log("✅ Resume Updated Successfully:", data);
//     return data;
//   } catch (error) {
//     console.error("❌ Error Updating Resume:", error);
//     throw error;
//   }
// }

// export async function updateResume(updatedData: ResumeInfo) {
//   const response = await fetch(`/resumes/${updatedData.id}/edit`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedData),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to update resume");
//   }

//   return response.json();
// }
