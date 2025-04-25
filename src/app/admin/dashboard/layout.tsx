import { PropsWithChildren } from "react";
import { AdminRootLayout } from "@/frontend/admin-dashboard/components/AdminRootLayout";

export const metadata = {
  title: "Admin Page | Shavigh",
};

export default function AdminLayout({ children }: PropsWithChildren) {
  return <AdminRootLayout>{children}</AdminRootLayout>;
}
