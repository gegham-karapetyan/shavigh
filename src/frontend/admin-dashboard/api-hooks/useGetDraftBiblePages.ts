import { GetBibleDynamicPageModel } from "@/http-api/interfaces/site-pages.models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GET_DRAFT_BIBLE_PAGES_QUERY_KEY =
  "GET_DRAFT_BIBLE_PAGES_QUERY_KEY";

export const useGetDraftBiblePages = () => {
  return useQuery({
    queryKey: [GET_DRAFT_BIBLE_PAGES_QUERY_KEY],
    queryFn: async () => {
      const { data } = await axios.get<GetBibleDynamicPageModel[]>(
        "/api/site-preview/bible/chapter-or-page/drafts",
        {
          params: {
            pageType: "page",
          },
        }
      );
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
