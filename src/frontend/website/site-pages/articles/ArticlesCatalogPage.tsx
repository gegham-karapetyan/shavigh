import { FC } from "react";
import {
  ArticlesCatalogLayout,
  ArticlesCatalogLayoutProps,
} from "../../components/pages-layouts/ArticlesCatalogLayout";

export interface ArticlesCatalogPageProps {
  articles: ArticlesCatalogLayoutProps["articles"];
}

export const ArticlesCatalogPage: FC<ArticlesCatalogPageProps> = ({
  articles,
}) => {
  return <ArticlesCatalogLayout articles={articles} />;
};
