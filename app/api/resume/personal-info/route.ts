import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { resumeId, ...info } = body;

    const personalInfo = await prisma.personalInfo.upsert({
      where: { resumeId },
      update: info,
      create: {
        resumeId,
        ...info,
      },
    });

    return NextResponse.json(personalInfo);
  } catch (error) {
    console.error("❌ Error saving personal info:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
