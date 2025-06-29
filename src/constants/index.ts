export const API_URL = process.env.API_URL;
export const STATIC_PAGES = [
  "home",
  "faith",
  "sanctuary-attitude",
  "books",
  "articles",
  "bible",
  "podcasts",
] as const;
export type StaticPagesType = (typeof STATIC_PAGES)[number];

export const enum STATUS_CODES {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}
export const enum PAGE_STATUS {
  DRAFT = "draft",
  PUBLISHED = "publish",
}
export const enum LANGUAGES {
  ECHMIADZIN = "echmiadzin",
  ARARAT = "ararat",
  GRABAR = "grabar",
}

export const SITE_PREVIEW_BASEPATH = "/site-preview";
