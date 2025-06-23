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
        status: data.status,
        data: {
          ...data,
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
        id: data.id,
        originId: data.originId,
        pageType: PageType.FAITH,
        isEditable: true,
        pathname,
        searchParams: qs,
      });
    }
  }, [data, sendRouteChange, pathname, qs]);

  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;

  const onEditTextContent = (identifier: string) => {
    sendEditEvent({
      id: data!.id,
      blockType: EditableBlockType.TEXT,
      pathname,
      searchParams: qs,
      identifier,
    });
  };

  const onEditArticles = (identifier: string) => {
    sendEditEvent({
      id: data!.id,
      blockType: EditableBlockType.ARTICLES,
      pathname,
      searchParams: qs,
      identifier,
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
