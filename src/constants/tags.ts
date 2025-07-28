export const tags = {
  getHomeRevalidateTag: () => "home",
  getFaithRevalidateTag: () => "faith",
  getArticlesRevalidateTag: () => "articles",
  getBibleMainPageRevalidateTag: () => "bible-main-page",
  getBibleNavigationRevalidateTag: () => "bible-navigation",
  getBibleChapterRevalidateTag: (
    lg: string,
    testament: string,
    book: string,
    chapter: string
  ) => `bible/${lg}/${testament}/${book}/${chapter}`,
  getBiblePageRevalidateTag: (
    lg: string,
    testament: string,
    book: string,
    chapter: string,
    page: string
  ) => `bible/${lg}/${testament}/${book}/${chapter}/${page}`,
  getSaintsBehaviorRevalidateTag: () => "saints-behavior",
  getSaintsBehaviorSectionRevalidateTag: (lg: string, section: string) =>
    `saintsbehavior/${lg}/${section}`,
  getSaintsBehaviorPageRevalidateTag: (
    lg: string,
    section: string,
    page: string
  ) => `saintsbehavior/${lg}/${section}/${page}`,
};
