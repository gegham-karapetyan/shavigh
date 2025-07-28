import { useEffect, useRef } from "react";
import {
  useOnRouteChangeEvent,
  useSendRouteChangeEvent,
} from "../../contexts/dashboard-messaging-context";

import { queryKeys } from "@/frontend/admin-dashboard/constants";

import { useRouter, useSearchParams } from "next/navigation";
import { useSitePreviewState } from "@/frontend/admin-dashboard/contexts/site-preview-state-context";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setPreviewState } = useSitePreviewState();

  const adminToPreviewFirstParamsRef = useRef({
    pathname: searchParams.get(queryKeys.PREVIEW_PATHNAME) || "/site-preview",
    query: searchParams.get(queryKeys.PREVIEW_QUERY),
  });

  useOnRouteChangeEvent((data) => {
    setPreviewState(data);

    router.push(
      `?${queryKeys.PREVIEW_PATHNAME}=${data.routePathname}${
        data.routeSearchParams
          ? `&${queryKeys.PREVIEW_QUERY}${data.routeSearchParams}`
          : ""
      }`
    );
  });
  const sendRouteChange = useSendRouteChangeEvent();

  useEffect(() => {
    sendRouteChange({
      pathname: adminToPreviewFirstParamsRef.current.pathname,
      searchParams: adminToPreviewFirstParamsRef.current.query,
    });
  }, [sendRouteChange]);

  return null;
};
