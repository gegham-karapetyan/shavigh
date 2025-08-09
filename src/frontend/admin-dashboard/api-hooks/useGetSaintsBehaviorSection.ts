import { GetSaintsBehaviorSectionModel } from "@/http-api/interfaces/site-pages.models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GET_SAINTS_BEHAVIOR_SECTION_QUERY_KEY =
  "GET_SAINTS_BEHAVIOR_SECTION_QUERY_KEY";

export const useGetSaintsBehaviorSection = (lg: string, section: string) => {
  return useQuery({
    queryKey: [GET_SAINTS_BEHAVIOR_SECTION_QUERY_KEY, lg, section],
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
