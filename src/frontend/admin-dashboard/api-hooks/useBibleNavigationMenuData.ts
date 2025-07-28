import { BibleNavDataModel } from "@/http-api/interfaces/site-pages.models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useBibleNavigationMenuData = () =>
  useQuery({
    queryKey: ["BIBLE_NAVIGATION_MENU_DATA_QUERY_KEY"],
    queryFn: async () => {
      const { data } = await axios.get<BibleNavDataModel>(
        "/api/site-preview/bible/nav-menu"
      );
      return data;
    },
    staleTime: Infinity,
  });
