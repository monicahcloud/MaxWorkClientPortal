import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { experiences } = body;

    console.log("📥 Received Experiences:", experiences);

    if (!Array.isArray(experiences)) {
      return NextResponse.json(
        {
          error: "Invalid data format. Expected 'experiences' to be an array.",
        },
        { status: 400 }
      );
    }

    // Validate each experience entry
    for (const exp of experiences) {
      if (!exp.resumeId || !exp.role || !exp.company) {
        console.error("❌ Missing required fields:", exp);
        return NextResponse.json(
          { error: "Missing required fields in experience data." },
          { status: 400 }
        );
      }
    }

    // Save each experience (create or update)
    const results = await Promise.all(
      experiences.map(async (exp) => {
        const data = {
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
          resumeId: exp.resumeId,
        };

        if (exp.id) {
          // Update existing experience
          return await prisma.experience.update({
            where: { id: exp.id },
            data,
          });
        } else {
          // Create new experience
          return await prisma.experience.create({ data });
        }
      })
    );

    return NextResponse.json({
      message: "✅ Experience saved successfully",
      results,
    });
  } catch (error: any) {
    console.error("💥 [SAVE EXPERIENCE ERROR]:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error?.message || "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
