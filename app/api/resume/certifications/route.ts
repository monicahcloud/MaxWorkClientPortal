import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { certifications } = await request.json();

    if (!certifications || !Array.isArray(certifications)) {
      return NextResponse.json(
        { error: "Invalid certifications data." },
        { status: 400 }
      );
    }

    for (const cert of certifications) {
      await prisma.certification.create({
        data: {
          title: cert.title,
          issuer: cert.issuer,
          issueDate: cert.issueDate,
          expirationDate: cert.expirationDate,
          credentialId: cert.credentialId,
          credentialUrl: cert.credentialUrl,
          resumeId: cert.resumeId,
        },
      });
    }

    return NextResponse.json(
      { message: "Certifications saved successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving certifications:", error);
    return NextResponse.json(
      { error: "Failed to save certifications." },
      { status: 500 }
    );
  }
} // <-- Make sure this closing brace is present!
