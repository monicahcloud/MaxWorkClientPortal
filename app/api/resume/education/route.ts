// /api/resume/education.js or /api/resume/education.ts

import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("API endpoint /api/resume/education called."); // Add this

    const { education } = await request.json();

    console.log("Received education data:", education); // Add this

    if (!education || !Array.isArray(education)) {
      console.log("Invalid education data received."); // Add this
      return NextResponse.json(
        { error: "Invalid education data." },
        { status: 400 }
      );
    }

    for (const edu of education) {
      console.log("Processing education entry:", edu); // Add this
      await prisma.education.create({
        data: {
          school: edu.school,
          degree: edu.degree,
          field: edu.field,
          startYear: edu.startYear,
          endYear: edu.endYear,
          resumeId: edu.resumeId,
        },
      });
    }

    console.log("Education data saved successfully."); // Add this
    return NextResponse.json(
      { message: "Education saved successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving education:", error); // Make sure this is present.
    return NextResponse.json(
      { error: "Failed to save education." },
      { status: 500 }
    );
  }
}
