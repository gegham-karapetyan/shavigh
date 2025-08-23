import { useCallback } from "react";

import { BubbleMenu } from "@tiptap/react";
import { Paper, Stack } from "@mui/material";

import { MultiColumn } from "./extensions/multi-columns/MultiColumn";
import { MenuButton, useRichTextEditorContext } from "mui-tiptap";
import AddColumnBefore from "./svgs/AddColumnBefore";
import AddColumnAfter from "./svgs/AddColumnAfter";
import { DeleteColumn } from "mui-tiptap/icons";

export function ColumnsBubbleMenu() {
  const editor = useRichTextEditorContext()!;
  const shouldShow = useCallback(
    () => editor.isActive(MultiColumn.name),
    [editor]
  );
  //   const deleteMe = useCallback(
  //     () => deleteNode(MultiColumn.name, editor),
  //     [editor]
  //   );
  const addColBefore = useCallback(
    () => editor.chain().focus().addColBefore().run(),
    [editor]
  );
  const addColAfter = useCallback(
    () => editor.chain().focus().addColAfter().run(),
    [editor]
  );
  const deleteCol = useCallback(() => {
    const { state } = editor;
    const $pos = state.selection.$anchor;
    let multiColumnDepth = -1;
    let multiColumnPos = -1;

    // Find the MultiColumn parent before making changes
    for (let d = $pos.depth; d > 0; d--) {
      const node = $pos.node(d);
      if (node.type.name === MultiColumn.name) {
        multiColumnDepth = d;
        multiColumnPos = $pos.before(d);
        break;
      }
    }

    editor.chain().focus().deleteCol().run();

    // After deleting, check if the MultiColumn node at that position is empty
    if (multiColumnDepth !== -1 && multiColumnPos !== -1) {
      const node = editor.state.doc.nodeAt(multiColumnPos);
      if (
        node &&
        node.type.name === MultiColumn.name &&
        node.childCount === 0
      ) {
        // Use view.dispatch for low-level deletion
        if (editor.view) {
          const tr = editor.state.tr.delete(
            multiColumnPos,
            multiColumnPos + node.nodeSize
          );
          editor.view.dispatch(tr);
        }
      }
    }
  }, [editor]);

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="columns-bubble-menu"
      shouldShow={shouldShow}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        placement: "bottom-start",
        offset: [-2, 16],
        zIndex: 9999,
        // onHidden: () => {
        //   toggleVisible(false)
        // },
      }}
    >
      <Paper component={Stack} direction="row" spacing={1} sx={{ p: 1 }}>
        <MenuButton
          tooltipLabel="Add Column Before"
          IconComponent={AddColumnBefore}
          onClick={addColBefore}
        />
        <MenuButton
          tooltipLabel="Add Column After"
          IconComponent={AddColumnAfter}
          onClick={addColAfter}
        />
        <MenuButton
          tooltipLabel="Delete Column"
          IconComponent={DeleteColumn}
          onClick={deleteCol}
        />
      </Paper>
    </BubbleMenu>
  );
}

// import { MenuButton } from "mui-tiptap";
