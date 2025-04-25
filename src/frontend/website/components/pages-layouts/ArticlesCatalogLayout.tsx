import { FC } from "react";
import { ArticleCard, ArticleCardProps } from "../ui/cards/ArticleCard";
import "./articles-catalog-layout.css";

export interface ArticlesCatalogLayoutProps {
  articles: ArticleCardProps["data"][];
}

export const ArticlesCatalogLayout: FC<ArticlesCatalogLayoutProps> = ({
  articles,
}) => {
  return (
    <main className="mt-16 lg:mt-[110px] px-5">
      <div className="main-container grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1fr_1.2fr_1fr]">
        {articles.map((article) => (
          <div className="article-grid-item" key={article.id}>
            <ArticleCard key={article.id} data={article} />
          </div>
        ))}
      </div>
    </main>
  );
};
