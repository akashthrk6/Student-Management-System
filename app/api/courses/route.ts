import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: Create a new course
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseName, description } = body;

    // Validate request data
    if (!courseName) {
      return NextResponse.json(
        { error: "courseName is required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        courseName,
        description,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}

// GET: List all courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}