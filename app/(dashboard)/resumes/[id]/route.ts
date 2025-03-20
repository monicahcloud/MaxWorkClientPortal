import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("GET /resumes/[id] called with id:", params.id);

    const { userId } = await auth();
    if (!userId) {
      console.log("GET /resumes/[id] - Unauthorized: No userId found.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("GET /resumes/[id] - userId:", userId);

    if (!params.id) {
      console.log("GET /api/resumes/[id] - Invalid params.id");
      return NextResponse.json({ error: "Invalid resume ID" }, { status: 400 });
    }

    const resume = await prisma.userResume.findUnique({
      where: { id: params.id },
    });

    if (!resume) {
      console.log("GET /resumes/[id] - Resume not found:", params.id);
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (resume.clerkId !== userId) {
      console.log("GET /api/resumes/[id] - Forbidden: clerkId mismatch.");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    console.log("GET /api/resumes/[id] - Returning resume:", resume);

    return NextResponse.json(resume); // ✅ Ensure only one response is sent
  } catch (error: any) {
    console.error("GET /api/resumes/[id] - Error fetching resume:", error);
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
    console.log("📌 PUT /resumes/[id] - Updating resume with ID:", params.id);

    const { userId } = await auth();
    if (!userId) {
      console.log("❌ Unauthorized: No userId found.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resume = await prisma.userResume.findUnique({
      where: { id: params.id },
    });

    if (!resume) {
      console.log("❌ Resume Not Found for ID:", params.id);
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (resume.clerkId !== userId) {
      console.log("🚫 Forbidden: User ID does not match resume owner.");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedData = await req.json();
    console.log("✏️ Updating Resume with Data:", updatedData);

    const updatedResume = await prisma.userResume.update({
      where: { id: params.id },
      data: updatedData, // Update fields from user input
    });

    console.log("✅ Resume Updated Successfully:", updatedResume);
    return NextResponse.json(updatedResume);
  } catch (error: any) {
    console.error("❌ Error Updating Resume:", error);
    return NextResponse.json(
      { error: "Failed to update resume" },
      { status: 500 }
    );
  }
}
