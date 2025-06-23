import {
  FaithPageContentInternalModel,
  GetArticleListItemModel,
  GetFaithPageModel,
  GetHomePageModel,
  HomePageContentInternalModel,
  StaticPageInternalModel,
} from "../interfaces/site-pages.models";

export const aggregateHomePageData = (
  homeData: StaticPageInternalModel,
  content: HomePageContentInternalModel,
  articles: GetArticleListItemModel[]
): GetHomePageModel => {
  return {
    ...homeData,
    content: {
      ...content,
      articles: articles,
    },
  };
};

export const aggregateFaithPageData = (
  faithData: StaticPageInternalModel,
  content: FaithPageContentInternalModel,
  articles: GetArticleListItemModel[]
): GetFaithPageModel => {
  const articlesMap = new Map<number, GetArticleListItemModel>(
    articles.map((article) => [article.id, article])
  );
  return {
    ...faithData,
    content: {
      ...content,
      bibliographiesArticles: content.bibliographiesArticles
        .map((id) => articlesMap.get(id))
        .filter(Boolean),
      researchArticles: content.researchArticles
        .map((id) => articlesMap.get(id))
        .filter(Boolean),
      translationsArticles: content.translationsArticles
        .map((id) => articlesMap.get(id))
        .filter(Boolean),
    },
  } as GetFaithPageModel;
};
