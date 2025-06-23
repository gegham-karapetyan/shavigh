import { Chip, CircularProgress } from "@mui/material";
import { useSitePreviewState } from "../../contexts/site-preview-state-context";
import { PAGE_STATUS } from "@/constants";

export const PageStateIndicators = () => {
  const { previewState } = useSitePreviewState();
  if (!previewState) {
    return <CircularProgress size="20px" />;
  }
  const isOriginal = previewState.status === PAGE_STATUS.PUBLISHED;

  return (
    <Chip
      color={isOriginal ? "success" : "info"}
      variant="outlined"
      size="small"
      label={`State : ${isOriginal ? "ORIGINAL" : "DRAFT"}`}
    />
  );
};
