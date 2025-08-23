import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Paper,
  PaperProps,
} from "@mui/material";
import Draggable from "react-draggable";
import { FC, PropsWithChildren, ReactNode, useRef } from "react";

function PaperComponent(props: PaperProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper
        {...props}
        style={{
          ...props.style,
          resize: "both",
        }}
        ref={nodeRef}
      />
    </Draggable>
  );
}

export type DraggableDialogProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  title: ReactNode;
  size?: DialogProps["maxWidth"];
  loading?: boolean;
}>;

export const DraggableDialog: FC<DraggableDialogProps> = ({
  open,
  onClose,
  onSave,
  title,
  children,
  size = "md",
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={size}
      fullWidth
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent sx={{ pt: 0 }} dividers>
        {children}
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <Button size="small" onClick={onClose}>
          Cancel
        </Button>
        <Button
          loading={loading}
          variant="contained"
          size="small"
          onClick={onSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
