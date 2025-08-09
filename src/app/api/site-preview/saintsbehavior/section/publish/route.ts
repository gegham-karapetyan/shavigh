import { EntityBaseModel } from "@/frontend/admin-dashboard/contexts/types";
import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const data = (await request.json()) as EntityBaseModel<{
    saintsBehaviourSectionAttachedPageIds: number[];
  }>;
  const response = await sitePreviewApi.publishSaintsBehaviorSectionData(
    data.id,
    data.originId!,
    data.saintsBehaviourSectionAttachedPageIds
  );
  if (!response.error) data.revalidateTags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
}
