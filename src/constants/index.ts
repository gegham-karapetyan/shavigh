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
