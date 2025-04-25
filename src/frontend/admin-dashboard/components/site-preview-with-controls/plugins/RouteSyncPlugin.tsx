import { useEffect, useRef } from "react";
import { useAdminDashboardMessagingChannel } from "../../../contexts/messaging-context";
import { useQueryParams } from "@/frontend/shared/hooks/useQueryParams";
import { queryKeys } from "@/frontend/admin-dashboard/constants";

/**
 * RouteSyncPlugin is a React component that synchronizes admin routes to preview routes on the first load,
 * such as on a page refresh.
 *
 * It uses the `useAdminDashboardMessagingChannel` hook to get the messaging channel and the `useQueryParams`
 * hook to get and set query parameters. The initial admin route and query parameters are stored in a ref
 * (`adminToPreviewFirstParamsRef`) to ensure they are available during the first render.
 *
 * On the first load, the `useEffect` hook sends a message to the preview route with the initial admin route
 * and query parameters if they exist.
 *
 * Another `useEffect` hook listens for route changes from the preview and updates the query parameters
 * accordingly to keep them in sync.
 *
 * @returns {null} This component does not render any UI.
 */
export const RouteSyncPlugin = () => {
  const messaging = useAdminDashboardMessagingChannel();
  const [queryParams, setQueryParams] = useQueryParams();
  const adminToPreviewFirstParamsRef = useRef({
    pathname: queryParams.get(queryKeys.PREVIEW_PATHNAME),
    query: queryParams.get(queryKeys.PREVIEW_QUERY),
  });

  useEffect(() => {
    const { pathname, query } = adminToPreviewFirstParamsRef.current;
    console.log("Sending preview to route change", messaging, pathname, query);
    if (pathname || query) {
      messaging?.sendPreviewToRouteChange({
        pathname: pathname ?? "",
        query: query,
      });
    }
  }, [messaging]);

  useEffect(() => {
    const unsubscribe = messaging?.onPreviewRouteChange((msg) => {
      if (
        queryParams.get(queryKeys.PREVIEW_PATHNAME) === msg.pathname &&
        queryParams.get(queryKeys.PREVIEW_QUERY) === msg.query
      )
        return;
      setQueryParams((params) => {
        params.set(queryKeys.PREVIEW_PATHNAME, msg.pathname);
        params.set(queryKeys.PREVIEW_QUERY, msg.query || "");
        return params;
      });
    });

    return () => {
      unsubscribe?.();
    };
  }, [messaging, queryParams, setQueryParams]);

  return null;
};
