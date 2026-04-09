import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    alert: "High contamination risk detected in your area!",
  });
}