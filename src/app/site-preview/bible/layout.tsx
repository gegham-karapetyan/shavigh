"use client";
import { PropsWithChildren } from "react";

import { BibleLayout } from "@/frontend/website/components/pages-layouts/BibleLayout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BibleNavDataModel } from "@/http-api/interfaces/site-pages.models";

const useBibleNavigationMenuData = () =>
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

export default function BibleLayoutPage(props: PropsWithChildren) {
  const { data, isLoading, isError } = useBibleNavigationMenuData();

  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;

  return <BibleLayout data={data!}>{props.children}</BibleLayout>;
}
