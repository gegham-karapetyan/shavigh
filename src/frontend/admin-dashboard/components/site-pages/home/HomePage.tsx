"use client";

import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import { HomeLayout } from "@/frontend/website/components/pages-layouts/HomeLayout";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useLayoutEffect } from "react";
import { Context } from "../../site-preview-with-controls/SiteIframeWithControls";
import {
  SitePreviewMessageType,
  IframeMessagingChannel,
} from "@/frontend/admin-dashboard/services/messaging-admin-and-site-preview";
import { useRouter } from "next/navigation";

const useGetHomePageData = () => {
  return useQuery({
    queryKey: ["homepage"],
    queryFn: async () => {
      const response = await fetch("/api/pages/home");
      return await response.json();
    },
  });
};

export function HomePageEditable() {
  // const { data } = useGetHomePageData();
  // console.log("data >>>>>>>>>>>>>>", data);
  const route = useRouter();
  console.log("editable....");
  useLayoutEffect(() => {
    const messaging = new IframeMessagingChannel();
    messaging.sendPreviewReady();
    const unsubscribe = messaging.onNeedToRouteChange((msg) => {
      console.log("msg.route", msg);
      route.push("/" + msg.pathname);
    });
    return () => {
      unsubscribe();
    };
  }, [route]);

  return (
    <HomeLayout welcomeContent={<HtmlContentRenderer content={"editable"} />} />
  );
}
