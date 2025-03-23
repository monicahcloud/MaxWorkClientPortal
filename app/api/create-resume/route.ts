import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const resumeData = await req.json();
    const resumeTitle = resumeData.resumeTitle || "Untitled Resume";
    console.log("Received resume data:", resumeData);
    // 1. Validate Data (Example - adjust to your needs)
    if (
      !resumeData.personalDetails ||
      !resumeData.personalDetails.firstName ||
      !resumeData.personalDetails.lastName ||
      !resumeData.experiences ||
      !Array.isArray(resumeData.experiences)
    ) {
      console.log("Validation failed: Invalid resume data structure.");
      return NextResponse.json(
        { error: "Invalid resume data structure." },
        { status: 400 }
      );
    }

    // Generate thumbnail data (example - adjust to your needs)
    const thumbnailData = {
      name: `${resumeData.personalDetails.firstName} ${resumeData.personalDetails.lastName}`,
      jobTitle: resumeData.personalDetails.jobTitle,
      experience: resumeData.experiences.map((exp: any) => exp.role),
    };

    // Store resume metadata and thumbnail data in the database using Prisma
    const newResume = await prisma.resume.create({
      data: {
        title: resumeTitle,
        userId: userId,
        thumbnailData: thumbnailData, // Store thumbnail data
      },
    });

    return NextResponse.json({
      message: "Resume created successfully!",
      resumeId: newResume.id,
      thumbnailData: thumbnailData, // Return thumbnail data
    });
  } catch (error) {
    console.error(
      "❌ Resume creation failed:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
