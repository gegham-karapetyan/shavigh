"use server";
import { publicApi } from "@/http-api/public-api";

export async function getFaithPageData() {
  return await publicApi.getFaithPageData();
}
