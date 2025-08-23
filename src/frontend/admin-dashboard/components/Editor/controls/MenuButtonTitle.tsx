import { MenuButton, useRichTextEditorContext } from "mui-tiptap";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import {
  Dialog,
  TextField,
  DialogContent,
  Button,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Fragment, useState } from "react";
import React from "react";
import { Editor } from "@tiptap/core";

// Utility to find the full range of a mark at a given position
function getMarkRange(editor: Editor, markName: string) {
  const { state } = editor;
  const { from } = state.selection;
  const $pos = state.doc.resolve(from);
  const markType = state.schema.marks[markName];
  if (!markType) return null;

  let start = $pos.parentOffset;
  let end = $pos.parentOffset;
  const marks = $pos.marks();

  // Find the mark at the current position
  const mark = marks.find((m) => m.type === markType);
  if (!mark) return null;

  // Walk backward to find the start
  while (start > 0) {
    const node = $pos.parent.childAfter(start - 1);
    if (!node.node || !node.node.marks.some((m) => m.type === markType)) break;
    start--;
  }
  // Walk forward to find the end
  while (end < $pos.parent.content.size) {
    const node = $pos.parent.childAfter(end);
    if (!node.node || !node.node.marks.some((m) => m.type === markType)) break;
    end++;
  }

  // Calculate absolute positions
  const absStart = $pos.start() + start;
  const absEnd = $pos.start() + end;

  return { start: absStart, end: absEnd };
}

export const MenuButtonTitle = () => {
  const [open, setOpen] = useState(false);
  const editor = useRichTextEditorContext();
  const disabled =
    editor?.can().toggleTooltip({ info: "" }) === false ||
    (editor?.state.selection.empty && !editor?.isActive("tooltip"));

  const handleSubmit = (data: string) => {
    if (!data.trim()) {
      editor?.chain().focus().unsetTooltip().run();
    } else {
      editor?.chain().focus().setTooltip({ info: data }).run();
    }
    setOpen(false);
  };

  const getCurrentTooltip = () => {
    if (!editor) return "";
    const { state } = editor;
    const { from, to } = state.selection;
    let tooltip = "";
    state.doc.nodesBetween(from, to, (node) => {
      if (node.marks) {
        const mark = node.marks.find((m) => m.type.name === "tooltip");
        if (mark && mark.attrs.info) {
          tooltip = mark.attrs.info;
        }
      }
    });
    return tooltip;
  };

  const currentTooltip = getCurrentTooltip();

  return (
    <Fragment>
      <MenuButton
        selected={!!currentTooltip}
        onClick={() => {
          if (editor?.isActive("tooltip")) {
            const markRange = getMarkRange(editor, "tooltip");
            if (markRange) {
              editor
                .chain()
                .setTextSelection({ from: markRange.start, to: markRange.end })
                .focus()
                .run();
            }
          } else {
            editor?.chain().focus().run();
          }
          editor?.commands.blur();
          setOpen(true);
        }}
        tooltipLabel="Tooltip"
        disabled={disabled}
        IconComponent={ClosedCaptionIcon}
      />
      {open && (
        <FormDialog
          defaultValue={currentTooltip}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </Fragment>
  );
};

export function FormDialog({
  onClose,
  onSubmit,
  defaultValue,
}: {
  onClose: () => void;
  onSubmit: (data: string) => void;
  defaultValue?: string;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = event.currentTarget["tooltip"].value;
    onSubmit(formData);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open onClose={onClose}>
      <DialogTitle>Add Title Text</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="subscription-form">
          <TextField
            defaultValue={defaultValue}
            autoFocus
            multiline
            margin="dense"
            id="tooltip"
            name="tooltip"
            label="Tooltip"
            fullWidth
            variant="outlined"
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" type="submit" form="subscription-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
