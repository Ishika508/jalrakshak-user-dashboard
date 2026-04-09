import { NextResponse } from "next/server";

export async function GET() {
  // later fetch from DB
  const data = [
    { time: "10:00", ph: 7.2, tds: 210 },
    { time: "10:05", ph: 7.4, tds: 230 },
    { time: "10:10", ph: 7.6, tds: 250 },
    { time: "10:15", ph: 7.8, tds: 260 },
  ];

  return NextResponse.json(data);
}