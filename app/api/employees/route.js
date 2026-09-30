
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("companydb");

    const employees = await db
      .collection("employees")
      .find({})
      .toArray();

    return NextResponse.json(employees);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Database connection failed"
      },
      {
        status: 500
      }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;

    const db = client.db("companydb");

    const employee = {
      name: body.name,
      email: body.email,
      department: body.department
    };

    const result = await db
      .collection("employees")
      .insertOne(employee);

    return NextResponse.json({
      message: "Employee created",
      id: result.insertedId
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create employee"
      },
      {
        status: 500
      }
    );
  }
}
