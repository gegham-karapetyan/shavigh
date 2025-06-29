import { PropsWithChildren } from "react";
import { getSaintsBehaviorData } from "./actions";
import { notFound } from "next/navigation";
import { SaintsBehaviorLayout } from "@/frontend/website/components/pages-layouts/SaintsBehaviorLayout";

export default async function Layout(props: PropsWithChildren) {
  const { data, error } = await getSaintsBehaviorData();
  const sections = data?.find(
    (item) => item.url === "saintsbehavior/echmiadzin"
  )?.sections;

  if (error) {
    return notFound();
  }
  return (
    <SaintsBehaviorLayout sections={sections ?? []}>
      {props.children}
    </SaintsBehaviorLayout>
  );
}
