import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: List course students
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id);

    if (isNaN(courseId)) {
      return NextResponse.json(
        { error: "Invalid course ID" },
        { status: 400 }
      );
    }

    // Find enrollments for the specific course and include student details
    const enrollments = await prisma.enrollment.findMany({
      where: { 
        courseId: courseId 
      },
      include: { 
        student: true 
      },
    });

    // Extract just the student objects from the enrollments array
    const students = enrollments.map((enrollment) => enrollment.student);

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students for this course" },
      { status: 500 }
    );
  }
}