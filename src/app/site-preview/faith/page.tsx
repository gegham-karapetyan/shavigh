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
  FaithLayout,
  BibliographiesArticlesSection,
  ResearchArticlesSection,
  TranslationsArticlesSection,
} from "@/frontend/website/components/pages-layouts/FaithLayout";
import { EditableContainer } from "@/frontend/website/components/ui/EditableContainer/EditableContainer";
import { GetFaithPageModel } from "@/http-api/interfaces/site-pages.models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useGetFaithPageData = () =>
  useQuery({
    queryKey: ["GET_FAITH_PAGE_DATA_QUERY_KEY"],
    queryFn: async () => {
      const { data } = await axios.get<GetFaithPageModel>(
        "/api/site-preview/faith"
      );
      return data;
    },
    staleTime: Infinity,
  });

export default function FaithPreviewPage() {
  const { data, isLoading, isError, refetch } = useGetFaithPageData();

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
          [getEntitySelector(PageType.FAITH, data.id)]: {
            ...data,
            connectedPages: [],
            pageType: PageType.FAITH,
            revalidateTags: [tags.getFaithRevalidateTag()],
            content: {
              ...data.content,
              researchArticles: data.content.researchArticles.map(
                (article) => article.id
              ),
              translationsArticles: data.content.translationsArticles.map(
                (article) => article.id
              ),
              bibliographiesArticles: data.content.bibliographiesArticles.map(
                (article) => article.id
              ),
            },
          },
        },
      });
    }
  }, [data, sendRouteChange, pathname, qs]);

  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;

  const onEditTextContent = (identifier: string) => {
    const selector = getEntitySelector(PageType.FAITH, data!.id);

    sendEditEvent({
      routeId: data!.id,
      id: data!.id,
      blockType: EditableBlockType.TEXT,
      editableBlockIdentifier: `${selector}.${identifier}`,
    });
  };

  const onEditArticles = (identifier: string) => {
    const selector = getEntitySelector(PageType.FAITH, data!.id);

    sendEditEvent({
      id: data!.id,
      routeId: data!.id,
      blockType: EditableBlockType.ARTICLES,
      editableBlockIdentifier: `${selector}.${identifier}`,
    });
  };

  return (
    <FaithLayout
      beliefsContent={
        <EditableContainer
          onEdit={() => onEditTextContent("content.beliefsContent")}
        >
          <HtmlContentRenderer content={data!.content.beliefsContent} />
        </EditableContainer>
      }
      biographiesContent={
        <EditableContainer
          onEdit={() => onEditTextContent("content.biographiesContent")}
        >
          <HtmlContentRenderer content={data!.content.biographiesContent} />
        </EditableContainer>
      }
      historicalContent={
        <EditableContainer
          onEdit={() => onEditTextContent("content.historicalContent")}
        >
          <HtmlContentRenderer content={data!.content.historicalContent} />
        </EditableContainer>
      }
      mapsContent={
        <EditableContainer
          onEdit={() => onEditTextContent("content.mapsContent")}
        >
          <HtmlContentRenderer content={data!.content.mapsContent} />
        </EditableContainer>
      }
      podcastsContent={
        <EditableContainer
          onEdit={() => onEditTextContent("content.podcastsContent")}
        >
          <HtmlContentRenderer content={data!.content.podcastsContent} />
        </EditableContainer>
      }
      religiousContent={
        <EditableContainer
          onEdit={() => onEditTextContent("content.religiousContent")}
        >
          <HtmlContentRenderer content={data!.content.religiousContent} />
        </EditableContainer>
      }
      introductionContent={
        <EditableContainer
          onEdit={() => onEditTextContent("content.introductionContent")}
        >
          <HtmlContentRenderer content={data!.content.introductionContent} />
        </EditableContainer>
      }
      researchArticlesSection={
        <EditableContainer
          onEdit={() => onEditArticles("content.researchArticles")}
        >
          <ResearchArticlesSection articles={data!.content.researchArticles} />
        </EditableContainer>
      }
      translationsArticlesSection={
        <EditableContainer
          onEdit={() => onEditArticles("content.translationsArticles")}
        >
          <TranslationsArticlesSection
            articles={data!.content.translationsArticles}
          />
        </EditableContainer>
      }
      bibliographiesArticlesSection={
        <EditableContainer
          onEdit={() => onEditArticles("content.bibliographiesArticles")}
        >
          <BibliographiesArticlesSection
            articles={data!.content.bibliographiesArticles}
          />
        </EditableContainer>
      }
    />
  );
}
