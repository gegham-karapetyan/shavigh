"use client";
import { createNode } from "@sanity/comlink";
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
  IDashboardMessageData,
  IDashboardRefetchMessageData,
  IDashboardRouteChangeMessageData,
  IWebsiteMessageData,
  IWebsiteOnEditMessageData,
  IWebsiteRouteChangeMessageData,
  WebsiteMessageType,
  WebsiteMessagingContextModel,
} from "./types";

const WebsiteMessagingContext =
  createContext<WebsiteMessagingContextModel | null>(null);

export const WebsiteMessagingProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const messaging = useRef<WebsiteMessagingContextModel["current"] | null>(
    null
  );

  if (!messaging.current) {
    messaging.current = {
      node: createNode<IWebsiteMessageData, IDashboardMessageData>({
        name: "website",
        connectTo: "dashboard",
      }),
    };
  }

  useEffect(() => {
    const node = messaging.current!.node;
    node.start();
    return () => {
      node.stop();
    };
  }, []);
  return (
    <WebsiteMessagingContext.Provider
      value={messaging as WebsiteMessagingContextModel}
    >
      {children}
    </WebsiteMessagingContext.Provider>
  );
};

export const useWebsiteMessagingChannel = () => {
  const messaging = useContext(WebsiteMessagingContext);
  if (!messaging) {
    throw new Error(
      "useWebsiteMessagingChannel must be used within a WebsiteMessagingProvider"
    );
  }
  return messaging;
};
/**
 *
 * listen event from dashboard
 */
export const useOnRouteChangeEvent = (
  onSuccess: (data: IDashboardRouteChangeMessageData["data"]) => void
) => {
  const messaging = useWebsiteMessagingChannel();

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  useEffect(() => {
    messaging.current.node.on(DashboardMessageType.ROUTE_CHANGE, (data) => {
      onSuccessRef.current(data);
    });
  }, [messaging]);
  return;
};

/**
 * send event from iframe to dashboard
 */
export const useSendRouteChangeEvent = () => {
  const messaging = useWebsiteMessagingChannel();
  return useCallback(
    (data: IWebsiteRouteChangeMessageData["data"]) => {
      messaging.current.node.post(WebsiteMessageType.ON_ROUTE_CHANGE, data);
    },
    [messaging]
  );
};
export const useSendEditEvent = () => {
  const messaging = useWebsiteMessagingChannel();
  return useCallback(
    (data: IWebsiteOnEditMessageData["data"]) => {
      messaging.current.node.post(WebsiteMessageType.ON_EDIT, data);
    },
    [messaging]
  );
};

/**
 *
 * listen event from dashboard
 */
export const useOnRefetchEvent = (
  onRefetch: (data: IDashboardRefetchMessageData["data"]) => void
) => {
  const messaging = useWebsiteMessagingChannel();

  const onRefetchRef = useRef(onRefetch);
  onRefetchRef.current = onRefetch;

  useEffect(() => {
    const unsubscribe = messaging.current.node.on(
      DashboardMessageType.REFETCH,
      (data) => {
        onRefetchRef.current(data);
      }
    );
    return unsubscribe;
  }, [messaging]);
  return;
};
