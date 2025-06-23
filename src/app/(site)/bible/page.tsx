import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import { getBibleManiPageData } from "./actions";
import { notFound } from "next/navigation";

export default async function BibleRootPage() {
  const result = await getBibleManiPageData();
  if (result.error) {
    return notFound();
  }
  return <HtmlContentRenderer content={result.data.content.content} />;
}
