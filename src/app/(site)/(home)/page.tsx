import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import {
  HomeLayout,
  ArticlesSection,
} from "@/frontend/website/components/pages-layouts/HomeLayout";
import { notFound } from "next/navigation";
import { getHomePageData } from "./actions";
import { articlesMock } from "@/tmp/articles-mock";

export default async function Home() {
  const result = await getHomePageData();

  if (result.error) {
    return notFound();
  }
  return (
    <HomeLayout
      articlesSection={
        // <ArticlesSection articles={result.data.content.articles} />
        <ArticlesSection articles={articlesMock.slice(0, 3)} />
      }
      welcomeContentSection={
        <HtmlContentRenderer content={result.data.content.welcomeContent} />
      }
    />
  );
}
