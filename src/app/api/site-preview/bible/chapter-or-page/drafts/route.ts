import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const pageType = searchParams.get("pageType") as "chapter" | "page";
  const data = await sitePreviewApi.getBibleDraftChaptersOrPages(pageType);
  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
}
