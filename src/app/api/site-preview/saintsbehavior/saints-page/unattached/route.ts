import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await sitePreviewApi.getUnattachedSaintBehaviorPages();
  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
}
