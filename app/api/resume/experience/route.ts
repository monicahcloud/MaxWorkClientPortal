// adjust based on your structure
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST: Save experiences
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { experiences } = body;

    if (!Array.isArray(experiences)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    // Optional: delete existing ones or filter duplicates based on user/session
    const saved = await prisma.experience.createMany({
      data: experiences.map((exp) => ({
        company: exp.company,
        role: exp.role,
        startDate: exp.startDate ? new Date(exp.startDate) : null,
        endDate: exp.endDate ? new Date(exp.endDate) : null,
        duties: exp.duties || "",
        responsibilities: exp.responsibilities || "",
        accomplishments: exp.accomplishments || "",
        clearance: exp.clearance || "",
        status: exp.status || "",
        grade: exp.grade || "",
        time: exp.time || "",
        resumeId: exp.resumeId, // Include resumeId
      })),
    });

    return NextResponse.json({
      message: "Saved successfully",
      count: saved.count,
    });
  } catch (error) {
    console.error("[SAVE EXPERIENCE ERROR]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
