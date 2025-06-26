"use client";
// import { SITE_PREVIEW_NAME } from "@/frontend/admin-dashboard/constants";
import { createController } from "@sanity/comlink";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  DashboardMessageType,
  DashboardMessagingContextModel,
  IDashboardMessageData,
  IDashboardRefetchMessageData,
  IDashboardRouteChangeMessageData,
  IWebsiteMessageData,
  IWebsiteOnEditMessageData,
  IWebsiteRouteChangeMessageData,
  WebsiteMessageType,
} from "./types";

const DashboardMessagingContext =
  createContext<DashboardMessagingContextModel | null>(null);

export const DashboardMessagingProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const messagingRef = useRef<DashboardMessagingContextModel["current"] | null>(
    null
  );
  if (!messagingRef.current) {
    const controller = createController({
      targetOrigin: "*",
    });
    const channel = controller.createChannel<
      IDashboardMessageData,
      IWebsiteMessageData
    >({
      name: "dashboard",
      heartbeat: true,
      connectTo: "website",
    });
    channel.start();
    messagingRef.current = {
      controller,
      channel,
    };
  }

  return (
    <DashboardMessagingContext.Provider
      value={messagingRef as DashboardMessagingContextModel}
    >
      {children}
    </DashboardMessagingContext.Provider>
  );
};

export const useDashboardMessagingChannel = () => {
  const messaging = useContext(DashboardMessagingContext);
  if (!messaging) {
    throw new Error(
      "useDashboardMessagingChannel must be used within a DashboardMessagingProvider"
    );
  }
  return messaging;
};

/**
 * send event from dashboard to iframe
 */
export const useSendRouteChangeEvent = () => {
  const messaging = useDashboardMessagingChannel();
  return useCallback(
    (data: IDashboardRouteChangeMessageData["data"]) => {
      messaging.current.channel.post(DashboardMessageType.ROUTE_CHANGE, data);
    },
    [messaging]
  );
};

/**
 * send event from dashboard to iframe
 */
export const useSendRefetchEvent = () => {
  const messaging = useDashboardMessagingChannel();
  return useCallback(
    (data: IDashboardRefetchMessageData["data"]) => {
      messaging.current.channel.post(DashboardMessageType.REFETCH, data);
    },
    [messaging]
  );
};
/**
 * listen event from iframe
 */
export const useOnRouteChangeEvent = (
  onSuccess: (data: IWebsiteRouteChangeMessageData["data"]) => void
) => {
  const messaging = useDashboardMessagingChannel();

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unsubscribe = messaging.current.channel.on(
      WebsiteMessageType.ON_ROUTE_CHANGE,
      (data) => {
        onSuccessRef.current(data);
      }
    );
    // return unsubscribe;
  }, [messaging]);
  return;
};

/**
 * send event from iframe when need to edit
 */
export const useOnEditEvent = (
  onEdit: (data: IWebsiteOnEditMessageData["data"]) => void
) => {
  const messaging = useDashboardMessagingChannel();
  const onEditRef = useRef(onEdit);
  onEditRef.current = onEdit;

  useEffect(() => {
    const unsubscribe = messaging.current.channel.on(
      WebsiteMessageType.ON_EDIT,
      (data) => {
        onEditRef.current(data);
      }
    );
    return unsubscribe;
  }, [messaging]);
};
