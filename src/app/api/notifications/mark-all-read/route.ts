import { NextResponse } from "next/server";
import { updateReadStatus } from "../route";

export async function POST() {
  try {
    // In a real app, you would update the database for the current user
    updateReadStatus('all', true);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
