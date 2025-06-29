import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json(null, { status: 200 });
};
