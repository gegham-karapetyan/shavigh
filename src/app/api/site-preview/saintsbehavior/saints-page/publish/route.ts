import { EntityBaseModel } from "@/frontend/admin-dashboard/contexts/types";
import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const data = (await request.json()) as EntityBaseModel;
  const response = await sitePreviewApi.publishSaintsBehaviorPageData(
    data.id,
    data.originId!
  );
  if (!response.error) data.revalidateTags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
}
