import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, email, age } = body;

    if (!studentName) {
      return NextResponse.json(
        { error: "studentName is required" },
        { status: 400 }
      );
    }

    const student = await prisma.student.create({
      data: {
        studentName,
        email,
        age,
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
