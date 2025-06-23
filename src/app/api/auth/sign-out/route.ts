import { deleteSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await deleteSession();
    return NextResponse.json(null, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(null, { status: 400 });
  }
};
