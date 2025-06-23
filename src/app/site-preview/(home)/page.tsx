// import heroDesktop from '@/media/images/home-hero-desktop.jpg'
"use client";
import {
  EditableBlockType,
  PageType,
} from "@/frontend/admin-dashboard/contexts/types";
import {
  useOnRefetchEvent,
  useSendEditEvent,
  useSendRouteChangeEvent,
} from "@/frontend/admin-dashboard/contexts/website-messaging-context";
import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import {
  HomeLayout,
  ArticlesSection,
} from "@/frontend/website/components/pages-layouts/HomeLayout";
import { EditableContainer } from "@/frontend/website/components/ui/EditableContainer/EditableContainer";
import { GetHomePageModel } from "@/http-api/interfaces/site-pages.models";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useGetHomeData = () =>
  useQuery({
    queryKey: ["GET_HOME_PAGE_DATA_QUERY_KEY"],
    queryFn: async () => {
      const { data } = await axios.get<GetHomePageModel>(
        "/api/site-preview/home"
      );
      return data;
    },
    staleTime: Infinity,
  });

export default function HomePreview() {
  const { data, isLoading, isError, refetch } = useGetHomeData();
  const sendRouteChange = useSendRouteChangeEvent();
  const sendEditEvent = useSendEditEvent();
  const pathname = usePathname();
  const search = useSearchParams();
  const qs = search.toString();

  useOnRefetchEvent(() => {
    refetch();
  });

  useEffect(() => {
    if (data) {
      sendRouteChange({
        status: data.status,
        data: {
          ...data,
          content: {
            ...data.content,
            articles: data.content.articles.map((article) => article.id),
          },
        },
        id: data.id,
        originId: data.originId,
        pageType: PageType.HOME,
        isEditable: true,
        pathname,
        searchParams: qs,
      });
    }
  }, [data, sendRouteChange, pathname, qs]);
  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;

  const onEditWelcomeContent = () => {
    sendEditEvent({
      id: data!.id,
      blockType: EditableBlockType.TEXT,
      pathname,
      searchParams: qs,
      identifier: "content.welcomeContent",
    });
  };
  const onEditArticlesSection = () => {
    sendEditEvent({
      id: data!.id,
      blockType: EditableBlockType.ARTICLES,
      pathname,
      searchParams: qs,
      identifier: "content.articles",
    });
  };
  return (
    <HomeLayout
      articlesSection={
        <EditableContainer onEdit={onEditArticlesSection}>
          <ArticlesSection articles={data!.content.articles} />
        </EditableContainer>
      }
      welcomeContentSection={
        <EditableContainer onEdit={onEditWelcomeContent}>
          <HtmlContentRenderer content={data!.content.welcomeContent} />
        </EditableContainer>
      }
    />
  );
}
