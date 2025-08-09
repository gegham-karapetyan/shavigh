import { GetSaintsBehaviorPageModel } from "@/http-api/interfaces/site-pages.models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GET_DRAFT_SAINT_BEHAVIOR_PAGES_QUERY_KEY =
  "GET_DRAFT_SAINT_BEHAVIOR_PAGES_QUERY_KEY";

export const useGetDraftSaintsBehaviorPages = () => {
  return useQuery({
    queryKey: [GET_DRAFT_SAINT_BEHAVIOR_PAGES_QUERY_KEY],
    queryFn: async () => {
      const { data } = await axios.get<
        Omit<GetSaintsBehaviorPageModel, "content">[]
      >("/api/site-preview/saintsbehavior/saints-page/drafts");
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
