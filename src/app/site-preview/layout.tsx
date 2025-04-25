import { PropsWithChildren } from "react";
import "@/frontend/website/global.css";
import { ConfigBar } from "@/frontend/website/components/config-bar";
import { Header } from "@/frontend/website/components/header";
import { Footer } from "@/frontend/website/components/Footer";
import { BasePathProvider } from "@/frontend/shared/contexts/basepath-context";
import { SitePreviewMessagingProvider } from "@/frontend/website/contexts/messaging-context";

export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <html lang="hy">
      <body>
        <SitePreviewMessagingProvider>
          <BasePathProvider base="/site-preview">
            <div>
              <ConfigBar />
              <Header />
              {children}
              <Footer />
            </div>
          </BasePathProvider>
        </SitePreviewMessagingProvider>
      </body>
    </html>
  );
}
