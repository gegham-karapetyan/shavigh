import { LANGUAGES } from "@/constants";
import { notFound } from "next/navigation";
import { getChapterOrPage } from "../../actions";
import {
  BibleDynamicNotFoundPage,
  BibleDynamicPageLayout,
} from "@/frontend/website/components/pages-layouts/BibleDynamicPageLayout";
import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";

export interface BibleDynamicPageProps {
  params: Promise<{ [key: string]: string | string[] }>;
}
export const generateStaticParams = () => [];

const isNotValidPath = (lg: string | string[], segments: string | string[]) => {
  if (
    !Array.isArray(segments) ||
    Array.isArray(lg) ||
    segments.length < 3 ||
    segments.length > 4
  ) {
    return true;
  }
};

export default async function Page(props: BibleDynamicPageProps) {
  const { segments, lg } = await props.params;

  if (isNotValidPath(lg, segments)) {
    return notFound();
  }

  const { data } = await getChapterOrPage(lg as string, segments as string[]);
  if (!data && lg === LANGUAGES.ECHMIADZIN) {
    return notFound();
  }

  if (!data) {
    const alternateUrl = `/bible/${LANGUAGES.ECHMIADZIN}/${(
      segments as string[]
    ).join("/")}`;
    return <BibleDynamicNotFoundPage alternateUrl={alternateUrl} />;
  }
  const isPage = segments.length === 4;

  return (
    <BibleDynamicPageLayout
      title={isPage ? data.title : undefined}
      prevLink={data.prevLink}
      nextLink={data.nextLink}
      contentSection={<HtmlContentRenderer content={data.content} />}
    />
  );
}
