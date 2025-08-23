import { EntityBaseModel } from "@/frontend/admin-dashboard/contexts/types";
import { sitePreviewApi } from "@/http-api/admin-api/site-preview-api";
import { withAuth } from "@/lib/withAuth";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const PUT = withAuth(async (request: Request) => {
  const data = (await request.json()) as EntityBaseModel;
  const response = await sitePreviewApi.publishStaticPage(
    data.id,
    data.originId!
  );
  if (!response.error) data.revalidateTags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json(null, {
    status: response?.error?.code || 200,
  });
});
