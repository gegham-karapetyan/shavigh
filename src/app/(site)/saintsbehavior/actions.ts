import { publicApi } from "@/http-api/public-api";

export const getSaintsBehaviorData = async () => {
  return await publicApi.getSaintsBehaviorData();
};
