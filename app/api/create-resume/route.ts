// app/api/create-resume/route.ts

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
    const resumeTitle = resumeData.title || "Untitled Resume";
    const resumeType = resumeData.resumeType; // Extract resumeType
    console.log("Received resume data:", resumeData);

    // 1. Validate Data (Example - adjust to your needs)
    if (!resumeType) {
      // Removed personalDetails and experiences validation
      console.log("Validation failed: Missing resumeType.");
      return NextResponse.json(
        { error: "Invalid resume data structure or missing resumeType." },
        { status: 400 }
      );
    }

    // Generate thumbnail data (example - adjust to your needs)
    const thumbnailData = {
      name: "Default Name", // Set default values as they are not being sent
      jobTitle: "Default Title",
      experience: [],
    };

    // Store resume metadata and thumbnail data in the database using Prisma
    const newResume = await prisma.resume.create({
      data: {
        title: resumeTitle,
        userId: userId,
        thumbnailData: thumbnailData, // Store thumbnail data
        resumeType: resumeType, // Store resumeType
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
