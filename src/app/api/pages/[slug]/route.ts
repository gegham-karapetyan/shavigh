import { StaticPagesType } from "@/constants";
import { GetSiteHomePageMode } from "@/interfaces/static-pages.mode";
import { staticPages } from "@/backend/services/static-pages-service";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: StaticPagesType }> }
) => {
  const { slug } = await params;
  const page = await staticPages.getPage(slug);
  const parsedContent = JSON.parse(page.content) as GetSiteHomePageMode;
  return NextResponse.json(parsedContent, { status: 200 });
};
