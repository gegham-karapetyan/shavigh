"use client";
import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import { SaintsBehaviorSectionLayout } from "@/frontend/website/components/pages-layouts/SaintsBehaviorSectionLayout";
import { useParams, usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { EditableContainer } from "@/frontend/website/components/ui/EditableContainer/EditableContainer";
import { useSendEditEvent } from "@/frontend/admin-dashboard/contexts/website-messaging-context";
import {
  EditableBlockType,
  PageType,
} from "@/frontend/admin-dashboard/contexts/types";
import { getEntitySelector } from "@/frontend/admin-dashboard/contexts/site-preview-state-context";
import { PAGE_STATUS } from "@/constants";
import { useGetSaintsBehaviorSection } from "@/frontend/admin-dashboard/api-hooks/useGetSaintsBehaviorSection";
// import { useSendEditEvent } from "@/frontend/admin-dashboard/contexts/website-messaging-context";
// import { EditableBlockType } from "@/frontend/admin-dashboard/contexts/types";

export default function Layout(props: PropsWithChildren) {
  const params = useParams() as { lg: string; section: string };
  const pathname = usePathname();

  const pagename = pathname.split("/").at(-1)!;

  const { data, isLoading, isError } = useGetSaintsBehaviorSection(
    params.lg,
    params.section
  );
  const sendEditEvent = useSendEditEvent();

  const onEditTextContent = () => {
    if (!pagename) return;
    const selector = getEntitySelector(
      PageType.SAINTS_BEHAVIOR_SECTION,
      data!.id
    );

    sendEditEvent({
      id: data!.id,
      routeId: `${data!.id}/${pagename}`,
      blockType: EditableBlockType.TEXT,
      editableBlockIdentifier: `${selector}.content`,
    });
  };

  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;
  return (
    <SaintsBehaviorSectionLayout
      sectionTitle={data!.title}
      section={
        <EditableContainer
          className={
            data!.status === PAGE_STATUS.DRAFT ? `bg-gray-100/50` : undefined
          }
          onEdit={onEditTextContent}
        >
          <HtmlContentRenderer content={data!.content} />
        </EditableContainer>
      }
    >
      {props.children}
    </SaintsBehaviorSectionLayout>
  );
}
