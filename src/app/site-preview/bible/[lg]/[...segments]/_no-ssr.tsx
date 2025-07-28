"use client";
import { LANGUAGES } from "@/constants";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BibleDynamicNotFoundPage,
  BibleDynamicPageLayout,
} from "@/frontend/website/components/pages-layouts/BibleDynamicPageLayout";
import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetBibleDynamicPageModel } from "@/http-api/interfaces/site-pages.models";
import {
  useOnRefetchEvent,
  useSendEditEvent,
  useSendRouteChangeEvent,
} from "@/frontend/admin-dashboard/contexts/website-messaging-context";
import { EditableContainer } from "@/frontend/website/components/ui/EditableContainer/EditableContainer";
import { useEffect, useMemo } from "react";
import {
  EditableBlockType,
  PageType,
} from "@/frontend/admin-dashboard/contexts/types";
import { tags } from "@/constants/tags";
import { getEntitySelector } from "@/frontend/admin-dashboard/contexts/site-preview-state-context";

interface GetBibleChapterOrPageQueryParams {
  lg: string;
  testament: string;
  book: string;
  chapter: string;
  page?: string;
}

const useGetBibleChapterOrPageData = (
  queryParams: GetBibleChapterOrPageQueryParams
) => {
  return useQuery({
    queryKey: ["GET_BIBLE_CHAPTER_OR_PAGE_DATA_QUERY_KEY", queryParams],
    queryFn: async () => {
      const { data } = await axios.get<GetBibleDynamicPageModel>(
        "/api/site-preview/bible/chapter-or-page",
        {
          params: queryParams,
        }
      );
      return data;
    },
    staleTime: Infinity,
  });
};

export default function NoSsrPage() {
  const sendRouteChange = useSendRouteChangeEvent();
  const sendEditEvent = useSendEditEvent();
  const pathname = usePathname();

  const queryParams = useMemo<GetBibleChapterOrPageQueryParams>(() => {
    const splitsPathname = pathname.split("/");

    return {
      lg: splitsPathname[3],
      testament: splitsPathname[4],
      book: splitsPathname[5],
      chapter: splitsPathname[6],
      page: splitsPathname[7] || undefined,
    };
  }, [pathname]);

  const { data, isLoading, isError, refetch } =
    useGetBibleChapterOrPageData(queryParams);
  const search = useSearchParams();
  const qs = search.toString();

  useOnRefetchEvent(() => {
    refetch();
  });

  useEffect(() => {
    if (data) {
      const revalidateTags = [];
      if (queryParams.page) {
        revalidateTags.push(
          tags.getBiblePageRevalidateTag(
            queryParams.lg,
            queryParams.testament,
            queryParams.book,
            queryParams.chapter,
            queryParams.page
          )
        );
      } else {
        revalidateTags.push(
          tags.getBibleChapterRevalidateTag(
            queryParams.lg,
            queryParams.testament,
            queryParams.book,
            queryParams.chapter
          )
        );
        if (!data.originId) {
          revalidateTags.push(tags.getBibleNavigationRevalidateTag());
        }
      }
      sendRouteChange({
        routeId: data.id,
        routeStatus: data.status,
        isRouteDataEditable: true,
        routePathname: pathname,
        routeSearchParams: qs,
        data: {
          [getEntitySelector(
            queryParams.page ? PageType.BIBLE_PAGE : PageType.BIBLE_CHAPTER,
            data.id
          )]: {
            ...data,
            revalidateTags,
            connectedPages: [],
            pageType: queryParams.page
              ? PageType.BIBLE_PAGE
              : PageType.BIBLE_CHAPTER,
          },
        },
      });
    }
  }, [data, sendRouteChange, pathname, qs, queryParams]);

  const onEditTextContent = () => {
    const selector = getEntitySelector(
      queryParams.page ? PageType.BIBLE_PAGE : PageType.BIBLE_CHAPTER,
      data!.id
    );
    sendEditEvent({
      routeId: data!.id,
      id: data!.id,

      blockType: EditableBlockType.TEXT,
      editableBlockIdentifier: `${selector}.content`,
    });
  };

  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;

  if (!data) {
    const alternateUrl = `/bible/${LANGUAGES.ECHMIADZIN}/${(
      Object.values(queryParams).filter(Boolean) as string[]
    ).join("/")}`;
    return <BibleDynamicNotFoundPage alternateUrl={alternateUrl} />;
  }
  return (
    <BibleDynamicPageLayout
      contentSection={
        <EditableContainer onEdit={onEditTextContent}>
          <HtmlContentRenderer content={data.content} />
        </EditableContainer>
      }
    />
  );
}
