import { verifySession } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json(await verifySession());
};
