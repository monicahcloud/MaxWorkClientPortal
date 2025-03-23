// /app/api/resume/skills/route.ts
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { skills } = await request.json();

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json(
        { error: "Invalid skills data." },
        { status: 400 }
      );
    }

    for (const skill of skills) {
      await prisma.skill.create({
        data: {
          name: skill.name,
          level: skill.level,
          resumeId: skill.resumeId,
        },
      });
    }

    return NextResponse.json(
      { message: "Skills saved successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving skills:", error);
    return NextResponse.json(
      { error: "Failed to save skills." },
      { status: 500 }
    );
  }
}
