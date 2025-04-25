import { PropsWithChildren } from "react";
import "@/frontend/website/global.css";
import { ConfigBar } from "@/frontend/website/components/config-bar";
import { Header } from "@/frontend/website/components/header";
import { BasePathProvider } from "@/shared/contexts/basepath-context";

export const dynamic = "force-dynamic";

export default function AdminSitePagesLayout({ children }: PropsWithChildren) {
  return (
    <BasePathProvider base="/admin/site-pages">
      <div>
        <ConfigBar />
        <Header />
        {children}
      </div>
    </BasePathProvider>
  );
}
