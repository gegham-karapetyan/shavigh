import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { publicApi } from "@/http-api/public-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const lg = searchParams.get("lg")!;
  const testament = searchParams.get("testament")!;
  const book = searchParams.get("book")!;
  const chapter = searchParams.get("chapter")!;
  const page = searchParams.get("page");

  let data;
  if (page) {
    data = await sitePreviewApi.getBiblePage(
      lg,
      testament,
      book,
      chapter,
      page
    );
    if (data.error) {
      data = await publicApi.getBiblePage(lg, testament, book, chapter, page);
    }
  } else {
    data = await sitePreviewApi.getBibleChapter(lg, testament, book, chapter);

    if (data.error) {
      data = await publicApi.getBibleChapter(lg, testament, book, chapter);
    }
  }

  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const searchParams = new URL(request.nextUrl).searchParams;
  const pageType = searchParams.get("pageType") as "chapter" | "page";
  const response = await sitePreviewApi.updateBibleChapterOrPageData(
    data,
    pageType
  );

  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
}
