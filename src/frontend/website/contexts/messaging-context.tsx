"use client";
import { SitePreviewMessagingChannel } from "@/frontend/shared/services/messaging-admin-and-site-preview";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

const SitePreviewMessagingContext =
  createContext<SitePreviewMessagingChannel | null>(null);

export const SitePreviewMessagingProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [messaging, setMessaging] =
    useState<SitePreviewMessagingChannel | null>(null);

  useLayoutEffect(() => {
    if (messaging !== null) return;
    setMessaging(new SitePreviewMessagingChannel());
  }, [messaging]);

  useEffect(() => {
    return () => messaging?.destroy();
  }, [messaging]);
  return (
    <SitePreviewMessagingContext.Provider value={messaging}>
      {children}
    </SitePreviewMessagingContext.Provider>
  );
};

export const useSitePreviewMessagingChannel = () => {
  const messaging = useContext(SitePreviewMessagingContext);

  return messaging;
};
