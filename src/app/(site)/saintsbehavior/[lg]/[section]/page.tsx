import { publicApi } from "@/http-api/public-api";
import { notFound, permanentRedirect } from "next/navigation";
import { parse } from "node-html-parser";

export const generateStaticParams = () => [];

export default async function Page({
  params,
}: {
  params: Promise<{ lg: string; section: string }>;
}) {
  const segments = await params;

  const { data, error } = await publicApi.getSaintsBehaviorSectionData(
    segments.lg,
    segments.section
  );

  if (error) {
    return notFound();
  }

  const parsedContent = parse(data.content);

  const firstUrl = parsedContent.querySelectorAll("a")[0].getAttribute("href");
  if (!firstUrl?.trim()) {
    return notFound();
  }

  return permanentRedirect(firstUrl);
}
