import { connectToDatabase } from "@/lib/mongodb";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Correctly destructure the database connection
    const connection = await connectToDatabase();
    const db = connection.db;

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({
      id: result.insertedId,
      name,
      email,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}