// import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { publicApi } from "@/http-api/public-api";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await publicApi.getBibleNavigation();

  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
}
