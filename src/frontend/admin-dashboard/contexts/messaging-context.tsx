import { SITE_PREVIEW_NAME } from "@/frontend/admin-dashboard/constants";
import { AdminDashboardMessagingChannel } from "@/frontend/shared/services/messaging-admin-and-site-preview";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

const AdminDashboardMessagingContext =
  createContext<AdminDashboardMessagingChannel | null>(null);

export const AdminDashboardMessagingProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [messaging, setMessaging] =
    useState<AdminDashboardMessagingChannel | null>(null);

  useLayoutEffect(() => {
    if (messaging !== null) return;
    setMessaging(new AdminDashboardMessagingChannel(SITE_PREVIEW_NAME));
  }, [messaging]);

  useEffect(() => {
    return () => messaging?.destroy();
  }, [messaging]);
  return (
    <AdminDashboardMessagingContext.Provider value={messaging}>
      {children}
    </AdminDashboardMessagingContext.Provider>
  );
};

export const useAdminDashboardMessagingChannel = () => {
  const messaging = useContext(AdminDashboardMessagingContext);

  return messaging;
};
