"use client";
import { PropsWithChildren, useState } from "react";
import "@/frontend/website/global.css";
import { ConfigBar } from "@/frontend/website/components/config-bar";
import { Header } from "@/frontend/website/components/header";
import { Footer } from "@/frontend/website/components/Footer";
import { BasePathProvider } from "@/frontend/shared/contexts/basepath-context";
// import { SyncPreviewRoutePlugin } from "@/frontend/website/contexts/messaging-context";
import {
  useOnRouteChangeEvent,
  WebsiteMessagingProvider,
} from "@/frontend/admin-dashboard/contexts/website-messaging-context";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// export const dynamic = "force-dynamic";

const RouteSyncPlugin = ({ onReady }: { onReady: () => void }) => {
  const router = useRouter();
  useOnRouteChangeEvent((data) => {
    router.push(
      `${data.pathname}${data.searchParams ? "?" + data.searchParams : ""}`
    );
    onReady();
  });

  return null;
};
const queryClient = new QueryClient();

export default function SiteLayout({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);

  return (
    <html lang="hy">
      <body>
        <QueryClientProvider client={queryClient}>
          <WebsiteMessagingProvider>
            <RouteSyncPlugin onReady={() => setIsReady(true)} />
            {isReady && (
              <BasePathProvider base="/site-preview">
                <div>
                  <ConfigBar />
                  <Header />
                  {children}
                  <Footer />
                </div>
              </BasePathProvider>
            )}
          </WebsiteMessagingProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
