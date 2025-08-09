import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = new URL(request.nextUrl).searchParams;
  const sectionId = searchParams.get("sectionId")!;
  const data = await sitePreviewApi.getSaintBehaviorPagesBySectionId(sectionId);
  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
};
