import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeId } = await req.json();

    if (!resumeId) {
      return NextResponse.json({ error: "Missing resumeId" }, { status: 400 });
    }

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      include: { personalInfo: true },
    });

    if (!resume || !resume.personalInfo) {
      return NextResponse.json(
        { error: "Missing personal info" },
        { status: 404 }
      );
    }

    const info = resume.personalInfo;

    const prompt = `
You are a professional resume writer. Write 3 different professional summaries for:

- Name: ${info.firstName} ${info.lastName}
- Job Title: ${info.jobTitle}
- Department: ${info.department}

Write:
1. Entry-Level:
2. Mid-Level:
3. Expert-Level:

Each summary should be 2–3 clear, impressive sentences.
Label each section exactly.
`;

    const aiRes = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    console.log("🔁 OpenAI raw response:", aiRes);
    const fullResponse = aiRes.choices[0]?.message?.content ?? "";

    return NextResponse.json({ fullResponse });
  } catch (error) {
    console.error("❌ AI summary error:", error);
    console.log(
      "🔑 OpenAI Key in backend:",
      process.env.OPENAI_API_KEY ? "Loaded" : "Missing"
    );

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
