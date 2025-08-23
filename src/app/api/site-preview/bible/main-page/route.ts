import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { publicApi } from "@/http-api/public-api";
import { withAuth } from "@/lib/withAuth";
import { NextResponse } from "next/server";

export async function GET() {
  let data = await sitePreviewApi.getBibleMainPageData();
  if (data.error) {
    data = await publicApi.getBibleMainPageData();
  }

  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
}

export const PUT = withAuth(async (request: Request) => {
  const data = await request.json();
  const response = await sitePreviewApi.updateStaticPageData(data);
  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
});
