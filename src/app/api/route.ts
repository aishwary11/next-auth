import { NextResponse } from "next/server";

export default async function GET() {
  return NextResponse.json({ name: "Aishwary Shah" }, { status: 200 });
}