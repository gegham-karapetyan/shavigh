import axios from "axios";
import { IPageData, PageType } from "../../contexts/types";

export const mutateHandlers = {
  [PageType.HOME]: {
    editHandler: (data: IPageData["data"]) =>
      axios.put<void>("/api/site-preview/home", data),
    publishHandler: (data: {
      id: number;
      originId?: number | null;
      path: string;
    }) => axios.put("/api/site-preview/home/publish", data),
  },
  [PageType.FAITH]: {
    editHandler: (data: IPageData["data"]) =>
      axios.put<void>("/api/site-preview/faith", data),
    publishHandler: (data: {
      id: number;
      originId?: number | null;
      path: string;
    }) => axios.put("/api/site-preview/faith/publish", data),
  },
  [PageType.BIBLE_MAIN_PAGE]: {
    editHandler: (data: IPageData["data"]) =>
      axios.put<void>("/api/site-preview/bible/main-page", data),
    publishHandler: (data: {
      id: number;
      originId?: number | null;
      path: string;
    }) => axios.put("/api/site-preview/bible/main-page/publish", data),
  },
  [PageType.BIBLE_CHAPTER]: {
    editHandler: (data: IPageData["data"]) =>
      axios.post<void>("/api/site-preview/bible/chapter-or-page", data, {
        params: {
          pageType: "chapter",
        },
      }),
    publishHandler: (data: {
      id: number;
      originId?: number | null;
      path: string;
    }) =>
      axios.put("/api/site-preview/bible/chapter-or-page/publish", data, {
        params: {
          pageType: "chapter",
        },
      }),
  },

  [PageType.BIBLE_PAGE]: {
    editHandler: (data: IPageData["data"]) =>
      axios.post<void>("/api/site-preview/bible/chapter-or-page", data, {
        params: {
          pageType: "page",
        },
      }),
    publishHandler: (data: {
      id: number;
      originId?: number | null;
      path: string;
    }) =>
      axios.put("/api/site-preview/bible/chapter-or-page/publish", data, {
        params: {
          pageType: "page",
        },
      }),
  },

  // must be implemented
  [PageType.ARTICLE]: {
    editHandler: (data: IPageData["data"]) =>
      axios.put<void>("/api/site-preview/{...}", data),
    publishHandler: (data: { id: number; originId?: number | null }) =>
      axios.put("/api/site-preview/{...}/publish", data),
  },
  [PageType.ARTICLES]: {
    editHandler: (data: IPageData["data"]) =>
      axios.put<void>("/api/site-preview/{...}", data),
    publishHandler: (data: { id: number; originId?: number | null }) =>
      axios.put("/api/site-preview/{...}/publish", data),
  },

  [PageType.SANCTUARY_ATTITUDE]: {
    editHandler: (data: IPageData["data"]) =>
      axios.put<void>("/api/site-preview/{...}", data),
    publishHandler: (data: { id: number; originId?: number | null }) =>
      axios.put("/api/site-preview/{...}/publish", data),
  },
  [PageType.BIBLE]: {
    editHandler: (data: IPageData["data"]) =>
      axios.put<void>("/api/site-preview/{...}", data),
    publishHandler: (data: { id: number; originId?: number | null }) =>
      axios.put("/api/site-preview/{...}/publish", data),
  },
};
