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
import { useEffect } from "react";
import {
  EditableBlockType,
  PageType,
} from "@/frontend/admin-dashboard/contexts/types";

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

export default function Page() {
  const sendRouteChange = useSendRouteChangeEvent();
  const sendEditEvent = useSendEditEvent();
  const pathname = usePathname();

  const splitsPathname = pathname.split("/");

  const queryParams: GetBibleChapterOrPageQueryParams = {
    lg: splitsPathname[3],
    testament: splitsPathname[4],
    book: splitsPathname[5],
    chapter: splitsPathname[6],
    page: splitsPathname[7] || undefined,
  };

  const { data, isLoading, isError, refetch } =
    useGetBibleChapterOrPageData(queryParams);
  const search = useSearchParams();
  const qs = search.toString();

  useOnRefetchEvent(() => {
    refetch();
  });

  useEffect(() => {
    if (data) {
      sendRouteChange({
        status: data.status,
        data: data,
        id: data.id,
        originId: data.originId,
        pageType: queryParams.page
          ? PageType.BIBLE_PAGE
          : PageType.BIBLE_CHAPTER,
        isEditable: true,
        pathname,
        searchParams: qs,
      });
    }
  }, [data, sendRouteChange, pathname, qs, queryParams.page]);

  const onEditWelcomeContent = () => {
    sendEditEvent({
      id: data!.id,
      blockType: EditableBlockType.TEXT,
      pathname,
      searchParams: qs,
      identifier: "content",
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
        <EditableContainer onEdit={onEditWelcomeContent}>
          <HtmlContentRenderer content={data.content} />
        </EditableContainer>
      }
    />
  );
}
