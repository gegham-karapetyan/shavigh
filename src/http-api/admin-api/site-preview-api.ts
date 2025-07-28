import { PAGE_STATUS } from "@/constants";
import { fetcher } from "../fetcher";
import {
  aggregateFaithPageData,
  aggregateHomePageData,
} from "../helpers/aggregators";
import {
  HomePageContentInternalModel,
  StaticPageInternalModel,
  FaithPageContentInternalModel,
  GetBibleDynamicPageModel,
  BibleMainPageContentModel,
  UpdateStaticPageInternalModel,
  UpdateBibleDynamicPageModel,
  GetSaintsBehaviorSectionModel,
  GetSaintsBehaviorPageModel,
  UpdateSaintsBehaviorSectionModel,
  UpdateSaintsBehaviorPageModel,
} from "../interfaces/site-pages.models";
import { publicApi } from "../public-api";

export const sitePreviewApi = {
  async getHomePageData() {
    const homeResponse = await fetcher<StaticPageInternalModel>(
      "/static-pages/home",
      {
        cache: "no-cache",
        params: { status: PAGE_STATUS.DRAFT },
      }
    );

    if (homeResponse.error) {
      return homeResponse;
    }

    const content = JSON.parse(
      homeResponse.data.content
    ) as HomePageContentInternalModel;
    const articlesResponse = await publicApi.getArticlesByIds(content.articles);
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

  async getBibleMainPageData() {
    const bibleMainPageResponse = await fetcher<StaticPageInternalModel>(
      "/static-pages/bible-main-page",
      {
        cache: "no-cache",
        params: { status: PAGE_STATUS.DRAFT },
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
  async publishStaticPage(id: number, originId: number) {
    const response = await fetcher<void>(`/static-pages/publish`, {
      method: "PUT",
      body: JSON.stringify({ id, originId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  async updateStaticPageData(data: UpdateStaticPageInternalModel) {
    const isFirstUpdate = !data.originId;
    const dataCopy = {
      id: isFirstUpdate ? undefined : data.id,
      originId: isFirstUpdate ? data.id : data.originId,
      uniqueName: data.uniqueName,
      content: JSON.stringify(data.content),
    };

    const response = await fetcher<void>("/static-pages", {
      method: "PUT",
      body: JSON.stringify(dataCopy),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  async getFaithPageData() {
    const faithResponse = await fetcher<StaticPageInternalModel>(
      "/static-pages/faith",
      {
        cache: "no-cache",
        params: { status: PAGE_STATUS.DRAFT },
      }
    );
    if (faithResponse.error) {
      return faithResponse;
    }
    const content = JSON.parse(
      faithResponse.data.content
    ) as FaithPageContentInternalModel;
    const articlesResponse = await publicApi.getArticlesByIds([
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

  async getBibleChapter(
    lg: string,
    testament: string,
    book: string,
    chapter: string
  ) {
    const bibleChapterResponse = await fetcher<GetBibleDynamicPageModel>(
      `/bibles/chapters`,
      {
        cache: "no-cache",
        params: {
          url: `bible/${lg}/${testament}/${book}/${chapter}`,
          status: PAGE_STATUS.DRAFT,
        },
      }
    );
    return bibleChapterResponse;
  },
  async publishBibleChapterOrPage(
    id: number,
    originId: number,
    bibleBookId: number | undefined,
    type: "chapter" | "page"
  ) {
    const url =
      type === "chapter"
        ? "/bibles/chapters/publish"
        : "/bibles/chapters/pages/publish";
    const response = await fetcher<void>(url, {
      method: "PUT",
      body: JSON.stringify({ id, originId, bibleBookId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  },
  async getBiblePage(
    lg: string,
    testament: string,
    book: string,
    chapter: string,
    page: string
  ) {
    const biblePageResponse = await fetcher<GetBibleDynamicPageModel>(
      "/bibles/chapters/pages",
      {
        cache: "no-cache",
        params: {
          url: `bible/${lg}/${testament}/${book}/${chapter}/${page}`,
          status: PAGE_STATUS.DRAFT,
        },
      }
    );
    return biblePageResponse;
  },
  async updateBibleChapterOrPageData(
    data: UpdateBibleDynamicPageModel,
    type: "chapter" | "page"
  ) {
    const isPublish = data.status === PAGE_STATUS.PUBLISHED;

    const isFirstUpdate = isPublish;
    const dataCopy = {
      ...data,
      id: isFirstUpdate ? undefined : data.id,
      originId: isFirstUpdate ? data.id : data.originId,
      status: undefined,
    };

    const url =
      type === "chapter" ? "/bibles/chapters" : "/bibles/chapters/pages";

    const response = await fetcher<void>(url, {
      method: "POST",
      body: JSON.stringify(dataCopy),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  async getBibleDraftChaptersOrPages(type: "chapter" | "page") {
    const url =
      type === "chapter"
        ? "/bibles/chapters/draft"
        : "/bibles/chapters/pages/draft";
    return await fetcher<GetBibleDynamicPageModel[]>(url);
  },
  getSaintsBehaviorSectionData(lg: string, section: string) {
    const url = `saintsbehavior/${lg}/${section}`;

    return fetcher<GetSaintsBehaviorSectionModel>("/saints-behavior/section", {
      cache: "no-cache",
      params: {
        status: PAGE_STATUS.DRAFT,
        url,
      },
    });
  },
  updateSaintsBehaviorSectionData(data: UpdateSaintsBehaviorSectionModel) {
    const isPublish = data.status === PAGE_STATUS.PUBLISHED;

    const isFirstUpdate = isPublish;

    const dataCopy = {
      ...data,
      id: isFirstUpdate ? undefined : data.id,
      originId: isFirstUpdate ? data.id : data.originId,
      status: undefined,
    };

    return fetcher<void>("/saints-behavior/section", {
      method: "POST",
      body: JSON.stringify(dataCopy),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  publishSaintsBehaviorSectionData(id: number, originId: number) {
    return fetcher<void>("/saints-behavior/section/publish", {
      method: "PUT",
      body: JSON.stringify({ id, originId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getSaintsBehaviorPageData(lg: string, section: string, page: string) {
    const url = `saintsbehavior/${lg}/${section}/${page}`;

    return fetcher<GetSaintsBehaviorPageModel>(
      "/saints-behavior/section/pages",
      {
        cache: "no-cache",
        params: {
          status: PAGE_STATUS.DRAFT,
          url,
        },
      }
    );
  },
  updateSaintsBehaviorPageData(data: UpdateSaintsBehaviorPageModel) {
    const isPublish = data.status === PAGE_STATUS.PUBLISHED;

    const isFirstUpdate = isPublish;

    const dataCopy = {
      ...data,
      id: isFirstUpdate ? undefined : data.id,
      originId: isFirstUpdate ? data.id : data.originId,
      status: undefined,
    };
    return fetcher<void>("/saints-behavior/section/pages", {
      method: "POST",
      body: JSON.stringify(dataCopy),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  publishSaintsBehaviorPageData(id: number, originId: number) {
    return fetcher<void>("/saints-behavior/section/pages/publish", {
      method: "PUT",
      body: JSON.stringify({ id, originId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
