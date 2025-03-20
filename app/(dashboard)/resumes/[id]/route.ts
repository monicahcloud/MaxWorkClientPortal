import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("GET /api/resumes/[id] called with id:", params.id); // Debugging: Log the ID

    const { userId } = await auth();

    if (!userId) {
      console.log("GET /api/resumes/[id] - Unauthorized: No userId found."); // Debugging: Log unauthorized access
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("GET /api/resumes/[id] - userId:", userId); // Debugging: Log the userId

    if (!params.id) {
      console.log(
        "GET /api/resumes/[id] - Invalid params.id: undefined or null"
      );
      return NextResponse.json({ error: "Invalid resume ID" }, { status: 400 });
    }

    const resume = await prisma.userResume.findUnique({
      where: { id: params.id },
    });

    if (!resume) {
      console.log(
        "GET /api/resumes/[id] - Resume not found for id:",
        params.id
      ); // Debugging: Log resume not found
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    console.log("GET /api/resumes/[id] - Resume found:", resume); // Debugging: Log found resume

    if (resume.clerkId !== userId) {
      console.log(
        "GET /api/resumes/[id] - Forbidden: clerkId mismatch. Resume clerkId:",
        resume.clerkId,
        "userId:",
        userId
      ); // Debugging: Log clerkId mismatch
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    console.log("GET /api/resumes/[id] - Returning resume:", resume); // Debugging: Log return

    return NextResponse.json(resume);
  } catch (error: any) {
    console.error(
      "GET /api/resumes/[id] - Error fetching resume:",
      error.message,
      error.stack
    ); // Debugging: Detailed error logging
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("PUT /api/resumes/[id] called with id:", params.id);

    const { userId } = await auth();

    if (!userId) {
      console.log("PUT /api/resumes/[id] - Unauthorized: No userId found.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("PUT /api/resumes/[id] - userId:", userId);

    if (!params.id) {
      console.log(
        "PUT /api/resumes/[id] - Invalid params.id: undefined or null"
      );
      return NextResponse.json({ error: "Invalid resume ID" }, { status: 400 });
    }

    const resume = await prisma.userResume.findUnique({
      where: { id: params.id },
    });

    if (!resume) {
      console.log(
        "PUT /api/resumes/[id] - Resume not found for id:",
        params.id
      );
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (resume.clerkId !== userId) {
      console.log(
        "PUT /api/resumes/[id] - Forbidden: clerkId mismatch. Resume clerkId:",
        resume.clerkId,
        "userId:",
        userId
      );
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedData = await req.json();

    console.log("PUT /api/resumes/[id] - updatedData:", updatedData);

    const updatedResume = await prisma.userResume.update({
      where: { id: params.id },
      data: updatedData,
    });

    console.log("PUT /api/resumes/[id] - Resume updated:", updatedResume);

    return NextResponse.json(updatedResume);
  } catch (error: any) {
    console.error(
      "PUT /api/resumes/[id] - Error updating resume:",
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: "Failed to update resume" },
      { status: 500 }
    );
  }
}
