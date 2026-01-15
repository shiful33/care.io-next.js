import { dbConnect } from "@/src/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const bookingsCollection = await dbConnect("bookings");
    const query = { _id: new ObjectId(id) };
    const result = await bookingsCollection.deleteOne(query);

    if (result.deletedCount === 1) {
      return NextResponse.json(
        { message: "Successfully deleted" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No booking found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const status = body.status;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const bookingsCollection = await dbConnect("bookings");
    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
