// app/api/resumes/[id]/route.ts

import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("API route hit for resumeId:", params.id); // Add this log
  try {
    const { userId } = await auth();
    const { id } = params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resume = await prisma.resume.findUnique({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        personalInfo: true,
        summary: true,
        experiences: true,
        education: true,
        skills: true,
        certifications: true,
        achievements: true,
      },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }
    console.log("Fetched resume data:", resume); // Add this log

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Optional: Confirm resume belongs to user (good for security)
    const resume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!resume || resume.userId !== userId) {
      return NextResponse.json(
        { error: "Resume not found or unauthorized" },
        { status: 403 }
      );
    }

    // 🔥 Manually delete related records first
    await prisma.personalInfo.deleteMany({
      where: { resumeId: id },
    });
    await prisma.summary.deleteMany({
      where: { resumeId: id },
    });
    await prisma.experience.deleteMany({
      where: { resumeId: id },
    });
    await prisma.education.deleteMany({
      where: { resumeId: id },
    });
    await prisma.skill.deleteMany({
      where: { resumeId: id },
    });
    await prisma.certification.deleteMany({
      where: { resumeId: id },
    });
    await prisma.achievement.deleteMany({
      where: { resumeId: id },
    });

    // ✅ Now it's safe to delete the resume
    await prisma.resume.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Resume deleted successfully" });
  } catch (error: any) {
    console.error("DELETE API: Error deleting resume:", error.message);
    return NextResponse.json(
      { error: "Failed to delete resume", details: error.message },
      { status: 500 }
    );
  }
}
