import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { UpdateSaintsBehaviorSectionModel } from "@/http-api/interfaces/site-pages.models";
import { publicApi } from "@/http-api/public-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const lg = searchParams.get("lg")!;
  const section = searchParams.get("section")!;

  let sectionData = await sitePreviewApi.getSaintsBehaviorSectionData(
    lg,
    section
  );

  if (sectionData.error) {
    sectionData = await publicApi.getSaintsBehaviorSectionData(lg, section);
  }

  return NextResponse.json(sectionData.data, {
    status: sectionData.error?.code ?? 200,
  });
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as UpdateSaintsBehaviorSectionModel;

  const response = await sitePreviewApi.updateSaintsBehaviorSectionData(data);
  console.log("response", response);
  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
}
