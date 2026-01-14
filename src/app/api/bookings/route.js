import { dbConnect } from "@/src/lib/dbConnect";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        const body = await request.json();
        const bookingsCollection = await dbConnect("bookings");
        const result = await bookingsCollection.insertOne(body);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const bookingsCollection = await dbConnect("bookings");
        const data = await bookingsCollection.find().toArray();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}