"use client";

import { PropsWithChildren } from "react";

import { SaintsBehaviorLayout } from "@/frontend/website/components/pages-layouts/SaintsBehaviorLayout";
import { useGetSaintsBehaviorData } from "./get-saints-behavior-data";

export default function Layout(props: PropsWithChildren) {
  const { data, isLoading, isError } = useGetSaintsBehaviorData();

  if (isLoading) return <div>loading....</div>;
  if (isError) return <div>error....</div>;

  return (
    <SaintsBehaviorLayout sections={data!}>
      {props.children}
    </SaintsBehaviorLayout>
  );
}
