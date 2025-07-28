// import heroDesktop from '@/media/images/home-hero-desktop.jpg'
"use client";
import { tags } from "@/constants/tags";
import { getEntitySelector } from "@/frontend/admin-dashboard/contexts/site-preview-state-context";
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
        routeId: data.id,
        routeStatus: data.status,
        isRouteDataEditable: true,
        routePathname: pathname,
        routeSearchParams: qs,
        data: {
          [getEntitySelector(PageType.HOME, data.id)]: {
            ...data,
            connectedPages: [],
            revalidateTags: [tags.getHomeRevalidateTag()],
            pageType: PageType.HOME,
            content: {
              ...data.content,
              articles: data.content.articles.map((article) => article.id),
            },
          },
        },
      });
    }
  }, [data, sendRouteChange, pathname, qs]);
  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;

  const onEditWelcomeContent = () => {
    const selector = getEntitySelector(PageType.HOME, data!.id);
    sendEditEvent({
      routeId: data!.id,
      id: data!.id,
      blockType: EditableBlockType.TEXT,
      editableBlockIdentifier: `${selector}.content.welcomeContent`,
    });
  };
  const onEditArticlesSection = () => {
    const selector = getEntitySelector(PageType.HOME, data!.id);

    sendEditEvent({
      routeId: data!.id,
      id: data!.id,
      blockType: EditableBlockType.ARTICLES,
      editableBlockIdentifier: `${selector}.content.articles`,
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
