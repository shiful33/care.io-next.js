import { dbConnect } from "@/src/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const collection = await dbConnect("products");
        const data = await collection.find({}).toArray();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}