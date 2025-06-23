import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import {
  FaithLayout,
  BibliographiesArticlesSection,
  ResearchArticlesSection,
  TranslationsArticlesSection,
} from "@/frontend/website/components/pages-layouts/FaithLayout";
import { notFound } from "next/navigation";
import { getFaithPageData } from "./actions";

export default async function FaithPage() {
  const { data, error } = await getFaithPageData();
  if (error) {
    return notFound();
  }
  return (
    <FaithLayout
      beliefsContent={
        <HtmlContentRenderer content={data.content.beliefsContent} />
      }
      biographiesContent={
        <HtmlContentRenderer content={data.content.biographiesContent} />
      }
      historicalContent={
        <HtmlContentRenderer content={data.content.historicalContent} />
      }
      mapsContent={<HtmlContentRenderer content={data.content.mapsContent} />}
      podcastsContent={
        <HtmlContentRenderer content={data.content.podcastsContent} />
      }
      religiousContent={
        <HtmlContentRenderer content={data.content.religiousContent} />
      }
      introductionContent={
        <HtmlContentRenderer content={data.content.introductionContent} />
      }
      researchArticlesSection={
        <ResearchArticlesSection articles={data.content.researchArticles} />
      }
      translationsArticlesSection={
        <TranslationsArticlesSection
          articles={data.content.translationsArticles}
        />
      }
      bibliographiesArticlesSection={
        <BibliographiesArticlesSection
          articles={data.content.bibliographiesArticles}
        />
      }
    />
  );
}
