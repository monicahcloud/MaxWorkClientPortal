import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("User ID:", userId);

    // Fetch resumes from database using Prisma
    const resumes = await prisma.resume.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc", // Order by creation date (optional)
      },
    });
    console.log("Resumes from database:", resumes);

    return NextResponse.json(resumes);
  } catch (error) {
    console.error(
      "❌ Failed to fetch resumes:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
