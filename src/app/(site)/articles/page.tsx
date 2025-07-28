import { ArticlesCatalogPage } from "@/frontend/website/site-pages/articles/ArticlesCatalogPage";
import { articlesMock } from "@/tmp/articles-mock";

export default function Page() {
  return <ArticlesCatalogPage articles={articlesMock} />;
}
