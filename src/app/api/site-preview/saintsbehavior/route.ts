import { publicApi } from "@/http-api/public-api";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await publicApi.getSaintsBehaviorData();

  return NextResponse.json(data.data, {
    status: data.error?.code || 200,
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
