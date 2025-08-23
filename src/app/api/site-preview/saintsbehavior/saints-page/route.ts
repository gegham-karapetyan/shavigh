import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { UpdateSaintsBehaviorPageModel } from "@/http-api/interfaces/site-pages.models";
import { publicApi } from "@/http-api/public-api";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const lg = searchParams.get("lg")!;
  const section = searchParams.get("section")!;
  const page = searchParams.get("page")!;

  let pageData = await sitePreviewApi.getSaintsBehaviorPageData(
    lg,
    section,
    page
  );

  if (pageData.error) {
    pageData = await publicApi.getSaintsBehaviorPageData(lg, section, page);
  }

  return NextResponse.json(pageData.data, {
    status: pageData.error?.code ?? 200,
  });
}

export const POST = withAuth(async (request: NextRequest) => {
  const data = (await request.json()) as UpdateSaintsBehaviorPageModel;

  const response = await sitePreviewApi.updateSaintsBehaviorPageData(data);

  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
});
