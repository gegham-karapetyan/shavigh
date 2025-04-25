"use client";
import { CSSProperties, FC, Fragment, useState } from "react";
import { Stack, Box } from "@mui/material";
import { DeviceControls } from "./DeviceControls";
import { PageStateIndicators } from "./PageStateIndicators";
import { PageSettings } from "./PageSettigns";

import { AdminDashboardMessagingProvider } from "../../contexts/messaging-context";
import { SITE_PREVIEW_NAME } from "@/frontend/admin-dashboard/constants";
import { RouteSyncPlugin } from "./plugins/RouteSyncPlugin";

const iframeStyles: CSSProperties = {
  // flex: 1,
  // minHeight: 0,
  width: "100%",
  height: "100%",
  border: "none",
  padding: 0,
  margin: 0,
  outline: "none",
  display: "block",
};

export const SitePreviewWithControls: FC<{ previewUrl: string }> = ({
  previewUrl,
}) => {
  const [width, setWidth] = useState("100%");

  return (
    <Fragment>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        boxShadow={1}
        p={1}
        position="relative"
      >
        <AdminDashboardMessagingProvider>
          <RouteSyncPlugin />
          <PageStateIndicators />
          <DeviceControls setWidth={setWidth} width={width} />
          <PageSettings />
        </AdminDashboardMessagingProvider>
      </Stack>

      <Stack flex={1} minHeight={0}>
        <Box flex={1} minHeight={0} sx={{ overflowX: "auto" }}>
          <Box height="100%" style={{ width }}>
            <iframe
              name={SITE_PREVIEW_NAME}
              style={iframeStyles}
              src={previewUrl}
            />
          </Box>
        </Box>
      </Stack>
    </Fragment>
  );
};
