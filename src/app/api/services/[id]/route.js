import { dbConnect } from "@/src/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        const collection = await dbConnect("products");
        const data = await collection.findOne({ _id: new ObjectId(id) });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}