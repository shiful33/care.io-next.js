import { dbConnect } from "@/src/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const usersCollection = await dbConnect("users");

    // Check to user
    const query = { email: body.email };
    const existingUser = await usersCollection.findOne(query);
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 200 }
      );
    }

    const result = await usersCollection.insertOne(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
