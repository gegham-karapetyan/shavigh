import { publicApi } from "@/http-api/public-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const data = await publicApi.search(searchParams.get("word")!);

  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
}
