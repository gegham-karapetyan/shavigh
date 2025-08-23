import { EntityBaseModel } from "@/frontend/admin-dashboard/contexts/types";
import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { withAuth } from "@/lib/withAuth";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = withAuth(async (request: NextRequest) => {
  const searchParams = new URL(request.nextUrl).searchParams;
  const pageType = searchParams.get("pageType") as "chapter" | "page";

  const data = (await request.json()) as EntityBaseModel<{
    bibleBookId: number | undefined;
    bibleBookChapterAttachedPageIds: number[];
  }>;
  const response = await sitePreviewApi.publishBibleChapterOrPage(
    data.id,
    data.originId!,
    data.bibleBookId as number | undefined,
    pageType,
    pageType === "chapter" ? data.bibleBookChapterAttachedPageIds : undefined
  );

  if (!response.error) data.revalidateTags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
});
