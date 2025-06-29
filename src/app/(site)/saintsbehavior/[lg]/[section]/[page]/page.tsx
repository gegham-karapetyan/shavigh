import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import { publicApi } from "@/http-api/public-api";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ lg: string; section: string; page: string }>;
}) {
  const segments = await params;
  const { data, error } = await publicApi.getSaintsBehaviorPageData(
    segments.lg,
    segments.section,
    segments.page
  );

  if (error) {
    return notFound();
  }
  return <HtmlContentRenderer content={data.content} />;
}
