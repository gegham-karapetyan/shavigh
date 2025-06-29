import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const pageType = searchParams.get("pageType") as "chapter" | "page";

  const data = (await request.json()) as {
    id: number;
    originId: number;
    path: string;
  };
  const response = await sitePreviewApi.publishBibleChapterOrPage(
    data.id,
    data.originId,
    pageType
  );

  if (!response?.error) revalidateTag(data.path.slice(1)); //remove first slash to get tag

  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
}
