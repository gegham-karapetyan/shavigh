"use client";
import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { Stack, Box } from "@mui/material";
import { DeviceControls } from "./DeviceControls";
import { PageStateIndicators } from "./PageStateIndicators";
import bgImg from "@/frontend/website/media/images/climpek.png";
// import { PageSettings } from "./PageSettigns";

import { SITE_PREVIEW_NAME } from "@/frontend/admin-dashboard/constants";

import { RouteSyncPlugin } from "./RouteSyncPlugin";
import { SitePreviewStateProvider } from "../../contexts/site-preview-state-context";
import { PublishControl } from "./PublishControl";
import { TextEditControl } from "./edit-controls/TextEditControl";
import { useDashboardMessagingChannel } from "../../contexts/dashboard-messaging-context";

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

const Iframe: FC<{ url: string }> = ({ url }) => {
  const messaging = useDashboardMessagingChannel();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframeElem = iframeRef.current;
    if (!iframeElem) return;
    const addTarget = () => {
      messaging.current.controller.addTarget(iframeElem.contentWindow!);
    };
    if (iframeElem.contentDocument?.readyState === "complete") {
      addTarget();
      return;
    }
    const onLoad = () => {
      addTarget();
    };
    iframeElem.addEventListener("load", onLoad);
    return () => {
      iframeElem.removeEventListener("load", onLoad);
    };
  }, [messaging]);

  return (
    <iframe
      id={SITE_PREVIEW_NAME}
      name={SITE_PREVIEW_NAME}
      style={iframeStyles}
      src={url}
      ref={iframeRef}
    />
  );
};

export const SitePreviewWithControls: FC<{ previewUrl: string }> = ({
  previewUrl,
}) => {
  const [width, setWidth] = useState("100%");

  return (
    <SitePreviewStateProvider>
      <TextEditControl />
      <RouteSyncPlugin />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        boxShadow={1}
        p={1}
        position="relative"
      >
        <PageStateIndicators />
        <DeviceControls setWidth={setWidth} width={width} />
        <PublishControl />
      </Stack>

      <Stack flex={1} minHeight={0}>
        <Box
          flex={1}
          minHeight={0}
          sx={{
            overflowX: "auto",
            backgroundImage: `url(${bgImg.src})`,
            backgroundRepeat: "repeat",
            backgroundColor: "currentcolor",
          }}
        >
          <Box
            height="100%"
            bgcolor="background.paper"
            mx="auto"
            style={{ width }}
          >
            <Iframe url={previewUrl} />
          </Box>
        </Box>
      </Stack>
    </SitePreviewStateProvider>
  );
};
