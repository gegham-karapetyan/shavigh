import {
  GetSaintsBehaviorModel,
  GetSaintsBehaviorSectionModel,
} from "@/http-api/interfaces/site-pages.models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSaintsBehaviorData = () => {
  return useQuery({
    queryKey: ["GET_SAINTS_BEHAVIOR_DATA_QUERY_DATA"],
    queryFn: async () => {
      const { data } = await axios.get<GetSaintsBehaviorModel[]>(
        "/api/site-preview/saintsbehavior"
      );
      const sections = data.find(
        (item) => item.url === "saintsbehavior/echmiadzin"
      )!.sections;
      return sections;
    },
  });
};
export const useGetSaintsBehaviorSection = (lg: string, section: string) => {
  return useQuery({
    queryKey: ["GET_SAINTS_BEHAVIOR_SECTION_QUERY_KEY", lg, section],
    queryFn: async () => {
      const { data } = await axios.get<GetSaintsBehaviorSectionModel>(
        "/api/site-preview/saintsbehavior/section",
        {
          params: {
            lg,
            section,
          },
        }
      );
      return data;
    },
  });
};
