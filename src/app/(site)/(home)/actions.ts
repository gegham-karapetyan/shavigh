"use server";
import { publicApi } from "@/http-api/public-api";

export const getHomePageData = async () => {
  return await publicApi.getHomePageData();
};
