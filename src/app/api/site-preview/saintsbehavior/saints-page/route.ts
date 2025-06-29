import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { publicApi } from "@/http-api/public-api";
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

// export async function POST(request: NextRequest) {
//   const data = await request.json();
//   const searchParams = new URL(request.nextUrl).searchParams;
//   const pageType = searchParams.get("pageType") as "chapter" | "page";
//   const response = await sitePreviewApi.updateBibleChapterOrPageData(
//     data,
//     pageType
//   );

//   return NextResponse.json(null, {
//     status: response?.error?.code || 200,
//   });
// }
