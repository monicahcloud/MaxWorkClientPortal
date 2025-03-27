import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeId, content } = await req.json();

    if (!resumeId || !content) {
      return NextResponse.json(
        { error: "Missing resumeId or content" },
        { status: 400 }
      );
    }

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        summary: {
          upsert: {
            where: {
              resumeId: resumeId, // Add the where clause. Adjust the where clause to match your schema.
            },
            create: {
              text: content,
            },
            update: {
              text: content,
            },
          },
        },
      },
      include: {
        summary: true,
      },
    });

    return NextResponse.json({ success: true, updatedResume });
  } catch (error) {
    console.error("❌ Error saving summary:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
