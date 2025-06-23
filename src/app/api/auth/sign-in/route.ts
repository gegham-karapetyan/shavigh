import { createSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = (await request.json()) as { login: string; password: string };
  if (data.login === process.env.LOGIN && data.password === process.env.PASS) {
    await createSession(data.login);

    return NextResponse.json(null, { status: 200 });
  }
  return NextResponse.json(null, { status: 400 });
};
