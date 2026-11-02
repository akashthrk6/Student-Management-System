import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const students = await prisma.student.findMany();
  return Response.json(students);
}

export async function POST(request) {
  const body = await request.json();
  const newStudent = await prisma.student.create({
    data: {
      name: body.name,
      email: body.email,
      age: body.age,
      course: body.course
    }
  });
  return Response.json(newStudent);
}
