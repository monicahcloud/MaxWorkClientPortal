// app/api/resumes/[id]/route.ts

import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    const { id } = params;
    const body = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedResume = await prisma.resume.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        title: body.title,
        resumeType: body.resumeType, // Include resumeType
        personalInfo: body.personalInfo,
        experiences: body.experiences,
        education: body.education,
        skills: body.skills,
        certifications: body.certifications,
        achievements: body.achievements,
        summary: body.summary,
        image: body.image,
      },
    });

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
