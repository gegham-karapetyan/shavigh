import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import { SaintsBehaviorSectionLayout } from "@/frontend/website/components/pages-layouts/SaintsBehaviorSectionLayout";
import { publicApi } from "@/http-api/public-api";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export const generateStaticParams = () => [];

type LayoutProps = PropsWithChildren<{
  params: Promise<{ lg: string; section: string }>;
}>;

export default async function Layout(props: LayoutProps) {
  const segments = await props.params;
  const { data, error } = await publicApi.getSaintsBehaviorSectionData(
    segments.lg,
    segments.section
  );

  if (error) {
    return notFound();
  }

  return (
    <SaintsBehaviorSectionLayout
      sectionTitle={data.title}
      section={<HtmlContentRenderer content={data.content} />}
    >
      {props.children}
    </SaintsBehaviorSectionLayout>
  );
}
