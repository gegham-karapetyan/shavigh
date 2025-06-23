import { fetcher } from "../fetcher";
import {
  HomePageContentInternalModel,
  StaticPageInternalModel,
  GetArticleListItemModel,
  FaithPageContentInternalModel,
  TestamentModel,
  GetBibleDynamicPageModel,
  BibleMainPageContentModel,
} from "../interfaces/site-pages.models";
import { createBibleNavDTO } from "../helpers/createBibleNavDTO";
import {
  aggregateFaithPageData,
  aggregateHomePageData,
} from "../helpers/aggregators";

const getArticlesByIds = (articleIds: number[]) => {
  return fetcher<GetArticleListItemModel[]>("/articles", {
    params: { ids: articleIds },
    cache: "force-cache",
    next: { tags: ["articles"] },
  });
};

export const publicApi = {
  async getHomePageData() {
    const homeResponse = await fetcher<StaticPageInternalModel>(
      "/static-pages/home",
      {
        cache: "force-cache",
        next: { tags: ["home"] },
      }
    );

    if (homeResponse.error) {
      return homeResponse;
    }
    const content = JSON.parse(
      homeResponse.data.content
    ) as HomePageContentInternalModel;
    const articlesResponse = await getArticlesByIds(content.articles);
    if (articlesResponse.error) {
      return articlesResponse;
    }
    return {
      data: aggregateHomePageData(
        homeResponse.data,
        content,
        articlesResponse.data
      ),
      error: null,
    };
  },
  async getFaithPageData() {
    const faithResponse = await fetcher<StaticPageInternalModel>(
      "/static-pages/faith",
      {
        cache: "force-cache",
        next: { tags: ["faith"] },
      }
    );
    if (faithResponse.error) {
      return faithResponse;
    }

    const content = JSON.parse(
      faithResponse.data.content
    ) as FaithPageContentInternalModel;

    const articlesResponse = await getArticlesByIds([
      ...content.bibliographiesArticles,
      ...content.researchArticles,
      ...content.translationsArticles,
      ,
    ] as number[]);
    if (articlesResponse.error) {
      return articlesResponse;
    }

    return {
      data: aggregateFaithPageData(
        faithResponse.data,
        content,
        articlesResponse.data
      ),
      error: null,
    };
  },
  async getBibleMainPageData() {
    const bibleMainPageResponse = await fetcher<StaticPageInternalModel>(
      "/static-pages/bible-main-page",
      {
        cache: "force-cache",
        next: { tags: ["bible-main-page"] },
      }
    );
    if (bibleMainPageResponse.error) {
      return bibleMainPageResponse;
    }
    const content = JSON.parse(
      bibleMainPageResponse.data.content
    ) as BibleMainPageContentModel;
    return {
      data: { ...bibleMainPageResponse.data, content },
      error: null,
    };
  },
  async getBibleNavigation() {
    const bibleNavigationResponse = await fetcher<TestamentModel[]>("/bibles", {
      cache: "force-cache",
      next: { tags: ["bible-navigation"] },
    });
    if (bibleNavigationResponse.error) {
      return bibleNavigationResponse;
    }
    return {
      data: createBibleNavDTO(bibleNavigationResponse.data),
      error: null,
    };
  },
  async getBibleChapter(
    lg: string,
    testament: string,
    book: string,
    chapter: string
  ) {
    const bibleChapterResponse = await fetcher<GetBibleDynamicPageModel>(
      `/bibles/chapters?url=bible/${lg}/${testament}/${book}/${chapter}`,
      {
        cache: "force-cache",
      }
    );
    return bibleChapterResponse;
  },
  async getBiblePage(
    lg: string,
    testament: string,
    book: string,
    chapter: string,
    page: string
  ) {
    const biblePageResponse = await fetcher<GetBibleDynamicPageModel>(
      `/bibles/chapters/pages?url=bible/${lg}/${testament}/${book}/${chapter}/${page}`,
      {
        cache: "force-cache",
      }
    );
    return biblePageResponse;
  },
  getArticlesByIds,
};
