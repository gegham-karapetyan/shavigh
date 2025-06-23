import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { revalidatePath } from "next/cache";
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

  if (!response?.error) revalidatePath(data.path);

  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
}
