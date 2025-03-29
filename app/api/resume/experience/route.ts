// app/api/resume/experience/route.ts

import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { experiences } = body;
    console.log("Received Experiences:", experiences); // Log the received data
    if (!Array.isArray(experiences)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      experiences.map(async (exp) => {
        if (exp.id) {
          // Update existing experience
          return prisma.experience.update({
            where: { id: exp.id },
            data: {
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
            },
          });
        } else {
          // Create new experience
          return prisma.experience.create({
            data: {
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
            },
          });
        }
      })
    );

    return NextResponse.json({
      message: "Saved successfully",
      results: results,
    });
  } catch (error) {
    console.error("[SAVE EXPERIENCE ERROR]", error);
    return NextResponse.json(
      { error: "Server error", details: "An unknown error occurred" },

      { status: 500 }
    );
  }
}
