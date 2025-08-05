import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = new URL(request.nextUrl).searchParams;
  const chapterId = searchParams.get("chapterId")!;
  const data = await sitePreviewApi.getPagesByChapterId(chapterId);
  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
};
