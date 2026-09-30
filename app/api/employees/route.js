import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - Fetch employees
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
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}

// POST - Add employee
export async function POST(request) {
  try {
    const body = await request.json();

    if (
      !body.name ||
      !body.email ||
      !body.department
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;

    const db = client.db("companydb");

    const result = await db
      .collection("employees")
      .insertOne({
        name: body.name,
        email: body.email,
        department: body.department
      });

    return NextResponse.json(
      {
        message: "Employee added successfully",
        id: result.insertedId
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to add employee" },
      { status: 500 }
    );
  }
}
