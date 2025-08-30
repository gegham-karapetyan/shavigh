"use client";
import { PropsWithChildren } from "react";
import { BibleLayout } from "@/frontend/website/components/pages-layouts/BibleLayout";
import { useBibleNavigationMenuData } from "@/frontend/admin-dashboard/api-hooks/useBibleNavigationMenuData";
import { BiblePageAuthorsProvider } from "@/frontend/shared/contexts/bible-page-authors-context";

export default function BibleLayoutPage(props: PropsWithChildren) {
  const { data, isLoading, isError } = useBibleNavigationMenuData();

  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;

  return (
    <BiblePageAuthorsProvider>
      <BibleLayout data={data!}>{props.children}</BibleLayout>
    </BiblePageAuthorsProvider>
  );
}
