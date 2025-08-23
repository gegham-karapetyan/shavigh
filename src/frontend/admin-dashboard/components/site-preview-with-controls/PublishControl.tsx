import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useSitePreviewState } from "../../contexts/site-preview-state-context";
import { PAGE_STATUS } from "@/constants";
import { useSendRefetchEvent } from "../../contexts/dashboard-messaging-context";
import { Fragment, useState } from "react";
import { mutateHandlers } from "./mutate-handlres";
import { PageType } from "../../contexts/types";

export const PublishControl = () => {
  const { previewState } = useSitePreviewState();
  const sendToRefetch = useSendRefetchEvent();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  if (!previewState) {
    return <CircularProgress size="20px" />;
  }
  const isPublished = previewState.routeStatus === PAGE_STATUS.PUBLISHED;
  const handlePublish = async () => {
    try {
      setIsLoading(true);
      const draftPages = Object.values(previewState.data).filter(
        (item) => item.status === PAGE_STATUS.DRAFT
      );

      const draftSaintsBehaviorPage = draftPages.find(
        (item) => item.pageType === PageType.SAINTS_BEHAVIOR_PAGE
      );
      if (draftSaintsBehaviorPage) {
        await mutateHandlers[PageType.SAINTS_BEHAVIOR_PAGE].publishHandler(
          draftSaintsBehaviorPage
        );
        await Promise.all(
          draftPages
            .filter((item) => item.pageType !== PageType.SAINTS_BEHAVIOR_PAGE)
            .map((item) => mutateHandlers[item.pageType].publishHandler(item))
        );
      } else {
        await Promise.all(
          draftPages.map((item) =>
            mutateHandlers[item.pageType].publishHandler(item)
          )
        );
      }

      sendToRefetch({ type: "refetch" });
      setOpenConfirmation(false);
    } catch (error) {
      console.error("Failed to publish the page:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    if (!isLoading) {
      setOpenConfirmation(false);
    }
  };
  return (
    <Fragment>
      <FormControlLabel
        disabled={isPublished}
        control={
          <Switch
            onChange={() => setOpenConfirmation(true)}
            size="small"
            checked={isPublished}
            color="primary"
          />
        }
        label="Publish"
      />
      <Dialog open={openConfirmation} onClose={handleClose}>
        <DialogTitle>Publish</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to publish this page? Once published, it will
            be visible to all users.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose}>
            cancel
          </Button>
          <Button
            size="small"
            loading={isLoading}
            variant="contained"
            disabled={isLoading}
            onClick={handlePublish}
            autoFocus
          >
            publish
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
