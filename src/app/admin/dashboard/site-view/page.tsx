"use client";
import { SitePreviewWithControls } from "@/frontend/admin-dashboard/components/site-preview-with-controls/SiteIframeWithControls";
import { DashboardMessagingProvider } from "@/frontend/admin-dashboard/contexts/dashboard-messaging-context";
import { Suspense } from "react";

export default function SitePreviewPage() {
  return (
    <DashboardMessagingProvider>
      <Suspense>
        <SitePreviewWithControls previewUrl="/site-preview" />
      </Suspense>
    </DashboardMessagingProvider>
  );
}
