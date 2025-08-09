import axios from "axios";
import {
  // RouteDataModel,
  PageType,
  EntityBaseModel,
} from "../../contexts/types";
import {
  GetBibleDynamicPageModel,
  GetSaintsBehaviorPageModel,
} from "@/http-api/interfaces/site-pages.models";
import { getLastPathSegment } from "@/utls/urls";

export const mutateHandlers = {
  [PageType.HOME]: {
    editHandler: (data: EntityBaseModel) =>
      axios.put<void>("/api/site-preview/home", data),
    publishHandler: (data: EntityBaseModel) =>
      axios.put("/api/site-preview/home/publish", data),
  },
  [PageType.FAITH]: {
    editHandler: (data: EntityBaseModel) =>
      axios.put<void>("/api/site-preview/faith", data),
    publishHandler: (data: EntityBaseModel) =>
      axios.put("/api/site-preview/faith/publish", data),
  },
  [PageType.BIBLE_MAIN_PAGE]: {
    editHandler: (data: EntityBaseModel) =>
      axios.put<void>("/api/site-preview/bible/main-page", data),
    publishHandler: (data: EntityBaseModel) =>
      axios.put("/api/site-preview/bible/main-page/publish", data),
  },
  [PageType.BIBLE_CHAPTER]: {
    editHandler: async (data: EntityBaseModel) => {
      return axios.post<void>("/api/site-preview/bible/chapter-or-page", data, {
        params: {
          pageType: "chapter",
        },
      });
    },
    publishHandler: async (data: EntityBaseModel) => {
      const { data: pages } = await axios.get<
        Omit<GetBibleDynamicPageModel, "content">[]
      >("/api/site-preview/bible/pages-by-chapter", {
        params: {
          chapterId: data.originId ?? data.id,
        },
      });
      const pagesMap = new Map<string, number>(
        pages.map((page) => [getLastPathSegment(page.url)!, page.id])
      );

      const bibleBookChapterAttachedPageIds = Array.from(
        new DOMParser()
          .parseFromString(data.content as string, "text/html")
          .querySelectorAll("a")
      )
        .map((a) => {
          const url = getLastPathSegment(a.getAttribute("href"));
          if (url && pagesMap.has(url)) {
            return pagesMap.get(url);
          }
          return null;
        })
        .filter((id) => id !== null) as number[];

      await axios.put(
        "/api/site-preview/bible/chapter-or-page/publish",
        { ...data, bibleBookChapterAttachedPageIds },
        {
          params: {
            pageType: "chapter",
          },
        }
      );
    },
  },

  [PageType.BIBLE_PAGE]: {
    editHandler: (data: EntityBaseModel) =>
      axios.post<void>("/api/site-preview/bible/chapter-or-page", data, {
        params: {
          pageType: "page",
        },
      }),
    publishHandler: (data: EntityBaseModel) =>
      axios.put("/api/site-preview/bible/chapter-or-page/publish", data, {
        params: {
          pageType: "page",
        },
      }),
  },

  [PageType.SAINTS_BEHAVIOR_SECTION]: {
    editHandler: (data: EntityBaseModel) =>
      axios.post<void>("/api/site-preview/saintsbehavior/section", data),
    publishHandler: async (data: EntityBaseModel) => {
      const { data: pages } = await axios.get<
        Omit<GetSaintsBehaviorPageModel, "content">[]
      >("/api/site-preview/saintsbehavior/pages-by-section", {
        params: {
          sectionId: data.originId ?? data.id,
        },
      });
      const pagesMap = new Map<string, number>(
        pages.map((page) => [getLastPathSegment(page.url)!, page.id])
      );

      const saintsBehaviourSectionAttachedPageIds = Array.from(
        new DOMParser()
          .parseFromString(data.content as string, "text/html")
          .querySelectorAll("a")
      )
        .map((a) => {
          const url = getLastPathSegment(a.getAttribute("href"));
          if (url && pagesMap.has(url)) {
            return pagesMap.get(url);
          }
          return null;
        })
        .filter((id) => id !== null) as number[];
      await axios.put("/api/site-preview/saintsbehavior/section/publish", {
        ...data,
        saintsBehaviourSectionAttachedPageIds,
      });
    },
  },
  [PageType.SAINTS_BEHAVIOR_PAGE]: {
    editHandler: (data: EntityBaseModel) =>
      axios.post<void>("/api/site-preview/saintsbehavior/saints-page", data),
    publishHandler: (data: EntityBaseModel) =>
      axios.put("/api/site-preview/saintsbehavior/saints-page/publish", data),
  },

  // must be implemented

  [PageType.ARTICLE]: {
    editHandler: (data: EntityBaseModel) =>
      axios.put<void>("/api/site-preview/{...}", data),
    publishHandler: (data: EntityBaseModel) =>
      axios.put("/api/site-preview/{...}/publish", data),
  },
  [PageType.ARTICLES]: {
    editHandler: (data: EntityBaseModel) =>
      axios.put<void>("/api/site-preview/{...}", data),
    publishHandler: (data: {
      id: number | string;
      originId?: number | string | null;
    }) => axios.put("/api/site-preview/{...}/publish", data),
  },

  [PageType.BIBLE]: {
    editHandler: (data: EntityBaseModel) =>
      axios.put<void>("/api/site-preview/{...}", data),
    publishHandler: (data: EntityBaseModel) =>
      axios.put("/api/site-preview/{...}/publish", data),
  },
};
