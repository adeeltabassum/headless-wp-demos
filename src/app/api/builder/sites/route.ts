import { NextResponse } from "next/server";
import { getRegistry } from "@/lib/sites/registry";

export async function GET() {
  return NextResponse.json({ sites: getRegistry() });
}
