import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { getBibleNavigationMenu } from "./actions";
import { BibleLayout } from "@/frontend/website/components/pages-layouts/BibleLayout";

export default async function BibleLayoutPage(props: PropsWithChildren) {
  const { data, error } = await getBibleNavigationMenu();

  if (error) {
    return notFound();
  }

  return <BibleLayout data={data}>{props.children}</BibleLayout>;
}
