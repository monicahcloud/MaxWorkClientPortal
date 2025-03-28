// app/api/resume/summary/route.ts

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.log("❌ Unauthorized user");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeId, content } = await req.json();

    console.log("➡️ Received resumeId:", resumeId);
    console.log("➡️ Received content:", content);

    if (!resumeId || !content) {
      console.log("❌ Missing resumeId or content");
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
            create: {
              text: content.text,
            },
            update: {
              text: content.text,
            },
          },
        },
      },
      include: {
        summary: true,
      },
    });

    console.log("✅ Summary saved successfully");

    return NextResponse.json({ success: true, updatedResume });
  } catch (error) {
    console.error("❌ Error saving summary:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
