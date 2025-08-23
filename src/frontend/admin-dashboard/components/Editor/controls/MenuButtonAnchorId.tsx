import { MenuButton, useRichTextEditorContext } from "mui-tiptap";
import AnchorIcon from "@mui/icons-material/Anchor";
import {
  Dialog,
  TextField,
  DialogContent,
  Button,
  DialogActions,
  DialogTitle,
  Alert,
} from "@mui/material";
import { Fragment, useState } from "react";
import React from "react";
import { Editor } from "@tiptap/core";
// import { MarkType } from "prosemirror-model";

function isValidHtmlId(id: string) {
  return /^[A-Za-z][A-Za-z0-9\-\_\:\.]*$/.test(id);
}

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

// // Helper to get the full range of the anchorId mark at the current selection
// function getAnchorIdMarkRange(editor: Editor) {
//   if (!editor?.isActive("anchorId")) return null;
//   const { state } = editor;
//   const { from } = state.selection;
//   const $pos = state.doc.resolve(from);
//   let start = from,
//     end = from;
//   $pos.marks().forEach((mark) => {
//     if (mark.type.name === "anchorId") {
//       // Find the mark range
//       state.doc.nodesBetween(0, state.doc.content.size, (node, pos) => {
//         if (node.isText && node.marks.some((m) => m.type.name === "anchorId")) {
//           node.marks.forEach((m) => {
//             if (m.type.name === "anchorId") {
//               const nodeStart = pos;
//               const nodeEnd = pos + node.nodeSize;
//               if (from >= nodeStart && from < nodeEnd) {
//                 start = nodeStart;
//                 end = nodeEnd - 1;
//               }
//             }
//           });
//         }
//       });
//     }
//   });
//   return { start, end };
// }

export const MenuButtonAnchorId = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editor = useRichTextEditorContext();

  // Only allow editing if selection is not inside anchorId, or matches the full mark range
  const disabled =
    editor?.can().toggleAnchorId({ id: "" }) === false ||
    (editor?.state.selection.empty && !editor?.isActive("anchorId"));

  //   let mustExpand = false;
  //   if (editor?.isActive("anchorId")) {
  //     const { from, to } = editor.state.selection;
  //     const markRange = getAnchorIdMarkRange(editor);
  //     if (markRange && (from !== markRange.start || to !== markRange.end)) {
  //       disabled = true;
  //       mustExpand = true;
  //     }
  //   }

  // Collect all unique anchor IDs in the selection
  const getCurrentIds = () => {
    if (!editor) return [];
    const { state } = editor;
    const { from, to } = state.selection;
    const ids = new Set<string>();
    state.doc.nodesBetween(from, to, (node) => {
      if (node.marks) {
        const mark = node.marks.find((m) => m.type.name === "anchorId");
        if (mark && mark.attrs.id) {
          ids.add(mark.attrs.id);
        }
      }
    });
    return Array.from(ids);
  };

  // Collect all anchor IDs in the document
  const getAllAnchorIds = () => {
    if (!editor) return [];
    const ids = new Set<string>();
    editor.state.doc.descendants((node) => {
      if (node.marks) {
        node.marks.forEach((mark) => {
          if (mark.type.name === "anchorId" && mark.attrs.id) {
            ids.add(mark.attrs.id);
          }
        });
      }
    });
    return Array.from(ids);
  };

  const handleSubmit = (data: string) => {
    const trimmed = data.trim();
    if (!trimmed) {
      editor?.chain().focus().unsetAnchorId().run();
      setOpen(false);
      setError(null);
      return;
    }
    if (!isValidHtmlId(trimmed)) {
      setError(
        "Invalid HTML id. Must start with a letter and contain only letters, digits, '-', '_', ':', or '.'."
      );
      return;
    }
    // Prevent duplicate IDs elsewhere in the document
    const allIds = getAllAnchorIds();
    const currentIds = getCurrentIds();
    if (allIds.includes(trimmed) && !currentIds.includes(trimmed)) {
      setError("This ID already exists elsewhere in the document.");
      return;
    }
    editor?.chain().focus().setAnchorId({ id: trimmed }).run();
    setOpen(false);
    setError(null);
  };

  const currentIds = getCurrentIds();
  const multipleIds = currentIds.length > 1;
  const currentId = multipleIds ? "" : currentIds[0] || "";

  return (
    <Fragment>
      <MenuButton
        selected={!!currentId}
        onClick={() => {
          setError(null);
          if (editor?.isActive("anchorId")) {
            // Use the improved getMarkRange
            const markRange = getMarkRange(editor, "anchorId");
            if (markRange) {
              const { state } = editor;
              const text = state.doc.textBetween(
                markRange.start,
                markRange.end,
                "\n",
                "\n"
              );
              const leadingSpaces = text.match(/^(\s*)/)?.[0].length ?? 0;
              const trailingSpaces = text.match(/(\s*)$/)?.[0].length ?? 0;
              const trimmedStart = markRange.start + leadingSpaces;
              const trimmedEnd = markRange.end - trailingSpaces;

              editor
                .chain()
                .setTextSelection({ from: trimmedStart, to: trimmedEnd })
                .focus()
                .run();
            }
          } else {
            editor?.chain().focus().run();
          }
          editor?.commands.blur();
          setOpen(true);
        }}
        tooltipLabel="Anchor ID"
        disabled={disabled}
        IconComponent={AnchorIcon}
      />
      {open && (
        <FormDialog
          defaultValue={currentId}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          error={
            multipleIds
              ? "Multiple different anchor IDs in selection. Editing will overwrite all."
              : error
          }
        />
      )}
    </Fragment>
  );
};

export function FormDialog({
  onClose,
  onSubmit,
  defaultValue,
  error,
}: {
  onClose: () => void;
  onSubmit: (data: string) => void;
  defaultValue?: string;
  error?: string | null;
}) {
  const [value, setValue] = useState(defaultValue ?? "");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open onClose={onClose}>
      <DialogTitle>Add Anchor Id</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="subscription-form">
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            margin="dense"
            id="anchorId"
            name="anchorId"
            label="Anchor Id"
            fullWidth
            variant="outlined"
            error={!!error}
            helperText={error}
          />
        </form>
        {error && !value && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
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
