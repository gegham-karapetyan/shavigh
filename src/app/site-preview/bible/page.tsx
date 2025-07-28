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
import { EditableContainer } from "@/frontend/website/components/ui/EditableContainer/EditableContainer";
import { GetBibleMainPageModel } from "@/http-api/interfaces/site-pages.models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useGetBibleMainPageData = () =>
  useQuery({
    queryKey: ["GET_BIBLE_MAIN_PAGE_DATA_QUERY_KEY"],
    queryFn: async () => {
      const { data } = await axios.get<GetBibleMainPageModel>(
        "/api/site-preview/bible/main-page"
      );
      return data;
    },
    staleTime: Infinity,
  });

export default function BibleMainPagePreview() {
  const { data, isLoading, isError, refetch } = useGetBibleMainPageData();
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
        routePathname: pathname,
        routeSearchParams: qs,
        routeStatus: data.status,
        isRouteDataEditable: false,
        data: {
          [getEntitySelector(PageType.BIBLE_MAIN_PAGE, data.id)]: {
            ...data,
            revalidateTags: [tags.getBibleMainPageRevalidateTag()],
            pageType: PageType.BIBLE_MAIN_PAGE,
            connectedPages: [],
          },
        },
      });
    }
  }, [data, sendRouteChange, pathname, qs]);
  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;

  const onEditContent = () => {
    const selector = getEntitySelector(PageType.BIBLE_MAIN_PAGE, data!.id);

    sendEditEvent({
      routeId: data!.id,
      id: data!.id,
      blockType: EditableBlockType.TEXT,
      editableBlockIdentifier: `${selector}.content.content`,
    });
  };

  return (
    <EditableContainer onEdit={onEditContent}>
      <HtmlContentRenderer content={data!.content.content} />
    </EditableContainer>
  );
}
