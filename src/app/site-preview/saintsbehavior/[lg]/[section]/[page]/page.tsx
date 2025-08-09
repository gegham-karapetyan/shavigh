"use client";
import {
  useOnRefetchEvent,
  useSendEditEvent,
  useSendRouteChangeEvent,
} from "@/frontend/admin-dashboard/contexts/website-messaging-context";
import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import { EditableContainer } from "@/frontend/website/components/ui/EditableContainer/EditableContainer";
import { GetSaintsBehaviorPageModel } from "@/http-api/interfaces/site-pages.models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  EditableBlockType,
  PageType,
} from "@/frontend/admin-dashboard/contexts/types";
import { PAGE_STATUS } from "@/constants";
import { tags } from "@/constants/tags";
import { getEntitySelector } from "@/frontend/admin-dashboard/contexts/site-preview-state-context";
import { useGetSaintsBehaviorSection } from "@/frontend/admin-dashboard/api-hooks/useGetSaintsBehaviorSection";

const useGetSaintsBehaviorPage = (
  lg: string,
  section: string,
  page: string
) => {
  return useQuery({
    queryKey: ["GET_SAINTS_BEHAVIOR_PAGE_QUERY_KEY", lg, section, page],
    queryFn: async () => {
      const { data } = await axios.get<GetSaintsBehaviorPageModel>(
        "/api/site-preview/saintsbehavior/saints-page",
        {
          params: {
            lg,
            section,
            page,
          },
        }
      );
      return data;
    },
  });
};

export default function Page() {
  const params = useParams() as { lg: string; section: string; page: string };

  const {
    data: pageData,
    isError: isPageDataError,
    isLoading: isPageDataLoading,
    isFetching: isPageDataFetching,
    refetch: refetchPageData,
  } = useGetSaintsBehaviorPage(params.lg, params.section, params.page);

  const {
    data: sectionData,
    isFetching: isSectionDataFetching,
    refetch: refetchSectionData,
  } = useGetSaintsBehaviorSection(params.lg, params.section);

  const sendRouteChange = useSendRouteChangeEvent();
  const pathname = usePathname();
  const search = useSearchParams();
  const qs = search.toString();
  const lg = params.lg;
  const section = params.section;
  const page = params.page;

  useOnRefetchEvent(() => {
    refetchPageData();
    refetchSectionData();
  });

  useEffect(() => {
    if (
      !isPageDataFetching &&
      !isSectionDataFetching &&
      sectionData &&
      pageData
    ) {
      sendRouteChange({
        routeId: `${sectionData.id}/${page}`,
        routeStatus:
          sectionData.status === PAGE_STATUS.DRAFT ||
          pageData.status === PAGE_STATUS.DRAFT
            ? PAGE_STATUS.DRAFT
            : PAGE_STATUS.PUBLISHED,
        isRouteDataEditable: true,
        routePathname: pathname,
        routeSearchParams: qs,
        data: {
          [getEntitySelector(PageType.SAINTS_BEHAVIOR_SECTION, sectionData.id)]:
            {
              ...sectionData,
              connectedPages: [],
              pageType: PageType.SAINTS_BEHAVIOR_SECTION,
              revalidateTags: [
                tags.getSaintsBehaviorSectionRevalidateTag(lg, section),
              ],
            },
          [getEntitySelector(PageType.SAINTS_BEHAVIOR_PAGE, pageData.id)]: {
            ...pageData,
            connectedPages: [],
            revalidateTags: [
              tags.getSaintsBehaviorPageRevalidateTag(lg, section, page),
            ],
            pageType: PageType.SAINTS_BEHAVIOR_PAGE,
          },
        },
      });
    }
  }, [
    isPageDataFetching,
    isPageDataLoading,
    isSectionDataFetching,
    lg,
    page,
    pageData,
    pathname,
    qs,
    section,
    sectionData,
    sendRouteChange,
  ]);

  const sendEditEvent = useSendEditEvent();

  const onEditTextContent = () => {
    const selector = getEntitySelector(
      PageType.SAINTS_BEHAVIOR_PAGE,
      pageData!.id
    );

    sendEditEvent({
      id: pageData!.id,
      routeId: `${sectionData!.id}/${page}`,
      blockType: EditableBlockType.TEXT,
      editableBlockIdentifier: `${selector}.content`,
    });
  };

  if (isPageDataError) {
    return <div>error.....</div>;
  }
  if (isPageDataLoading) {
    return <div>loading.....</div>;
  }

  return (
    <EditableContainer
      className={
        pageData!.status === PAGE_STATUS.DRAFT ? `bg-gray-100/50` : undefined
      }
      onEdit={onEditTextContent}
    >
      <HtmlContentRenderer content={pageData!.content} />
    </EditableContainer>
  );
}
