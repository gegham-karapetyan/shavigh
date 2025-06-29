"use client";
import { useSendRouteChangeEvent } from "@/frontend/admin-dashboard/contexts/website-messaging-context";
import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import { EditableContainer } from "@/frontend/website/components/ui/EditableContainer/EditableContainer";
import { GetSaintsBehaviorPageModel } from "@/http-api/interfaces/site-pages.models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useGetSaintsBehaviorSection } from "../../../get-saints-behavior-data";
import { useEffect } from "react";
import { PageType } from "@/frontend/admin-dashboard/contexts/types";
import { PAGE_STATUS } from "@/constants";

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
  } = useGetSaintsBehaviorPage(params.lg, params.section, params.page);
  const {
    data: sectionData,

    isFetching: isSectionDataFetching,
  } = useGetSaintsBehaviorSection(params.lg, params.section);
  const sendRouteChange = useSendRouteChangeEvent();
  const pathname = usePathname();
  const search = useSearchParams();
  const qs = search.toString();
  useEffect(() => {
    if (
      !isPageDataFetching &&
      !isSectionDataFetching &&
      sectionData &&
      pageData
    ) {
      sendRouteChange({
        id: `${sectionData.id}/${pageData.id}`,
        status:
          sectionData.status === PAGE_STATUS.DRAFT ||
          pageData.status === PAGE_STATUS.DRAFT
            ? PAGE_STATUS.DRAFT
            : PAGE_STATUS.PUBLISHED,
        pageType: PageType.SAINTS_BEHAVIOR,
        isEditable: true,
        pathname,
        searchParams: qs,
        data: {
          page: pageData,
          section: sectionData,
        },
      });
    }
  }, [
    isPageDataFetching,
    isPageDataLoading,
    isSectionDataFetching,
    pageData,
    pathname,
    qs,
    sectionData,
    sendRouteChange,
  ]);

  if (isPageDataError) {
    return <div>error.....</div>;
  }
  if (isPageDataLoading) {
    return <div>loading.....</div>;
  }
  console.log("page data", pageData);
  return (
    <EditableContainer>
      <HtmlContentRenderer content={pageData!.content} />
    </EditableContainer>
  );
}
