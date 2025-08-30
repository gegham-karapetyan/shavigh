import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { getBibleNavigationMenu } from "./actions";
import { BiblePageAuthorsProvider } from "@/frontend/shared/contexts/bible-page-authors-context";

import { BibleLayout } from "@/frontend/website/components/pages-layouts/BibleLayout";

export default async function BibleLayoutPage(props: PropsWithChildren) {
  const { data, error } = await getBibleNavigationMenu();

  if (error) {
    return notFound();
  }

  return (
    <BiblePageAuthorsProvider>
      <BibleLayout data={data}>{props.children}</BibleLayout>;
    </BiblePageAuthorsProvider>
  );
}
