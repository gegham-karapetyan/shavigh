"use server";

import { publicApi } from "@/http-api/public-api";

export const getBibleNavigationMenu = async () =>
  await publicApi.getBibleNavigation();

export const getBibleManiPageData = async () => {
  return await publicApi.getBibleMainPageData();
};

export const getChapterOrPage = async (lg: string, segments: string[]) => {
  const [testament, book, chapter, page] = segments;
  if (page) {
    return await publicApi.getBiblePage(lg, testament, book, chapter, page);
  }
  return await publicApi.getBibleChapter(lg, testament, book, chapter);
};
