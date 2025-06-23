import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { publicApi } from "@/http-api/public-api";
import { NextResponse } from "next/server";

export async function GET() {
  let data = await sitePreviewApi.getHomePageData();
  if (data.error) {
    data = await publicApi.getHomePageData();
  }

  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
}

export async function PUT(request: Request) {
  const data = await request.json();
  const response = await sitePreviewApi.updateStaticPageData(data);
  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
}
