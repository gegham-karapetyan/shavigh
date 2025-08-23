import { fetcher } from "../fetcher";
import {
  HomePageContentInternalModel,
  StaticPageInternalModel,
  GetArticleListItemModel,
  FaithPageContentInternalModel,
  TestamentModel,
  GetBibleDynamicPageModel,
  BibleMainPageContentModel,
  GetSaintsBehaviorModel,
  GetSaintsBehaviorSectionModel,
  GetSaintsBehaviorPageModel,
} from "../interfaces/site-pages.models";
import { createBibleNavDTO } from "../helpers/createBibleNavDTO";
import {
  aggregateFaithPageData,
  aggregateHomePageData,
} from "../helpers/aggregators";
import { tags } from "@/constants/tags";
import { CreateInboxMessageModel } from "../interfaces/inbox.models";

const getArticlesByIds = (articleIds: number[]) => {
  return fetcher<GetArticleListItemModel[]>("/articles", {
    params: { ids: articleIds },
    cache: "force-cache",
    next: { tags: [tags.getArticlesRevalidateTag()] },
  });
};

export const publicApi = {
  search(word: string) {
    return fetcher<GetBibleDynamicPageModel[]>("/search", {
      cache: "no-cache",
      params: {
        word,
      },
    });
  },
  async getHomePageData() {
    const homeResponse = await fetcher<StaticPageInternalModel>(
      "/static-pages/home",
      {
        cache: "force-cache",
        next: { tags: [tags.getHomeRevalidateTag()] },
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
        next: { tags: [tags.getFaithRevalidateTag()] },
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
        next: { tags: [tags.getBibleMainPageRevalidateTag()] },
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
      next: { tags: [tags.getBibleNavigationRevalidateTag()] },
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
    const url = `bible/${lg}/${testament}/${book}/${chapter}`;
    const bibleChapterResponse = await fetcher<GetBibleDynamicPageModel>(
      `/bibles/chapters?url=${url}`,
      {
        cache: "force-cache",
        next: {
          tags: [
            tags.getBibleChapterRevalidateTag(lg, testament, book, chapter),
          ],
        },
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
    const url = `bible/${lg}/${testament}/${book}/${chapter}/${page}`;
    const biblePageResponse = await fetcher<GetBibleDynamicPageModel>(
      `/bibles/chapters/pages?url=${url}`,
      {
        cache: "force-cache",
        next: {
          tags: [
            tags.getBiblePageRevalidateTag(lg, testament, book, chapter, page),
          ],
        },
      }
    );
    return biblePageResponse;
  },
  getArticlesByIds,

  getSaintsBehaviorData() {
    return fetcher<GetSaintsBehaviorModel[]>("/saints-behavior", {
      cache: "force-cache",
      next: { tags: [tags.getSaintsBehaviorRevalidateTag()] },
    });
  },
  getSaintsBehaviorSectionData(lg: string, section: string) {
    const url = `saintsbehavior/${lg}/${section}`;
    return fetcher<GetSaintsBehaviorSectionModel>("/saints-behavior/section", {
      cache: "force-cache",
      next: { tags: [tags.getSaintsBehaviorSectionRevalidateTag(lg, section)] },
      params: {
        url,
      },
    });
  },
  getSaintsBehaviorPageData(lg: string, section: string, page: string) {
    const url = `saintsbehavior/${lg}/${section}/${page}`;

    return fetcher<GetSaintsBehaviorPageModel>(
      "/saints-behavior/section/pages",
      {
        cache: "force-cache",
        next: {
          tags: [tags.getSaintsBehaviorPageRevalidateTag(lg, section, page)],
        },
        params: {
          url,
        },
      }
    );
  },
  createInboxMessage(data: CreateInboxMessageModel) {
    return fetcher<void>("/inbox", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
