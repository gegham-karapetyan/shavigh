"use client";
import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import { SaintsBehaviorSectionLayout } from "@/frontend/website/components/pages-layouts/SaintsBehaviorSectionLayout";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";
import { useGetSaintsBehaviorSection } from "../../get-saints-behavior-data";
// import { useSendEditEvent } from "@/frontend/admin-dashboard/contexts/website-messaging-context";
// import { EditableBlockType } from "@/frontend/admin-dashboard/contexts/types";

export default function Layout(props: PropsWithChildren) {
  const params = useParams() as { lg: string; section: string };

  const { data, isLoading, isError } = useGetSaintsBehaviorSection(
    params.lg,
    params.section
  );
  // const sendEditEvent = useSendEditEvent();

  // const onEditTextContent = (identifier: string) => {
  //   sendEditEvent({
  //     id: data!.id,
  //     blockType: EditableBlockType.TEXT,
  //     pathname,
  //     searchParams: qs,
  //     identifier,
  //   });
  // };

  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;
  return (
    <SaintsBehaviorSectionLayout
      sectionTitle={data!.title}
      section={<HtmlContentRenderer content={data!.content} />}
    >
      {props.children}
    </SaintsBehaviorSectionLayout>
  );
}
