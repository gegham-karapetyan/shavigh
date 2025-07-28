import axios from "axios";
import {
  // RouteDataModel,
  PageType,
  EntityBaseModel,
} from "../../contexts/types";

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
    editHandler: (data: EntityBaseModel) =>
      axios.post<void>("/api/site-preview/bible/chapter-or-page", data, {
        params: {
          pageType: "chapter",
        },
      }),
    publishHandler: (data: EntityBaseModel) =>
      axios.put("/api/site-preview/bible/chapter-or-page/publish", data, {
        params: {
          pageType: "chapter",
        },
      }),
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
    publishHandler: (data: EntityBaseModel) =>
      axios.put("/api/site-preview/saintsbehavior/section/publish", data),
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

  // [PageType.SAINTS_BEHAVIOR]: {
  //   editHandler: (data: EntityBaseModel) =>
  //     axios.put<void>("/api/site-preview/{...}", data),
  //   publishHandler: (data: EntityBaseModel) =>
  //     axios.put("/api/site-preview/{...}/publish", data),
  // },
  [PageType.BIBLE]: {
    editHandler: (data: EntityBaseModel) =>
      axios.put<void>("/api/site-preview/{...}", data),
    publishHandler: (data: EntityBaseModel) =>
      axios.put("/api/site-preview/{...}/publish", data),
  },
};
