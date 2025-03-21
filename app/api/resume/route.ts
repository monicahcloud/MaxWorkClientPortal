import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const newResume = await prisma.resume.create({
      data: {
        title: body.title || "Untitled Resume",
        userId,
      },
    });

    return NextResponse.json(newResume);
  } catch (error) {
    console.error(
      "❌ Resume creation failed:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
