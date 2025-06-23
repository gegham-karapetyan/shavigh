import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const data = (await request.json()) as { id: number; originId: number };
  const response = await sitePreviewApi.publishStaticPage(
    data.id,
    data.originId
  );
  if (!response.error) revalidateTag("home");

  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
}
