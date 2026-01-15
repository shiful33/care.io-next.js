import { dbConnect } from "@/src/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

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
        { message: "No booking found with this ID" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Delete API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const { status } = await req.json();
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
