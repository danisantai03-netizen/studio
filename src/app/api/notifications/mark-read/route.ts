import { NextResponse } from "next/server";
import { updateReadStatus } from "../route";

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Invalid 'ids' provided" }, { status: 400 });
    }

    // In a real app, you would update the database here
    const updatedIds = updateReadStatus(ids, true);
    
    return NextResponse.json({ success: true, updatedIds });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
