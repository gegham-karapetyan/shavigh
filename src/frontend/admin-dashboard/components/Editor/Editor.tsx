import { FC } from "react";
import {
  LinkBubbleMenu,
  RichTextEditor,
  TableBubbleMenu,
  type RichTextEditorRef,
} from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";
import { styled } from "@mui/material";
import { ColumnsBubbleMenu } from "./ColumnsBubbleMenu";
export type { RichTextEditorRef } from "mui-tiptap";

const StyledEditor = styled(RichTextEditor)(() => ({
  minHeight: "500px",
  "& .columns": {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    gap: "16px",
    marginTop: "16px",
  },
  "& .column": {
    minWidth: "360px",
    padding: "8px",
    borderWidth: "1px",
    borderStyle: "dashed",
    borderColor: "black",
    borderRadius: "2px",
    flex: "1 1 0%",
    boxSizing: "border-box",
    "& p:first-of-type": {
      marginTop: 0,
    },
  },
  "& span[data-info]": {
    borderBottom: "1px dotted red",
  },
  "& span[id]": {
    borderBottom: "1px dotted blue",
  },
  // An example of how editor styles can be overridden. In this case,
  // setting where the scroll anchors to when jumping to headings. The
  // scroll margin isn't built in since it will likely vary depending on
  // where the editor itself is rendered (e.g. if there's a sticky nav
  // bar on your site).
  "& .ProseMirror": {
    "& h1, & h2, & h3, & h4, & h5, & h6": {
      scrollMarginTop: 50,
    },
  },
}));

export interface EditorProps {
  editorRef: React.RefObject<RichTextEditorRef | null>;
  defaultContent?: string;
}

export const Editor: FC<EditorProps> = ({ editorRef, defaultContent = "" }) => {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

  return (
    <StyledEditor
      immediatelyRender={false}
      ref={editorRef}
      extensions={extensions}
      content={defaultContent}
      editable
      //   editorProps={{
      //     handleDrop: handleDrop,
      //     handlePaste: handlePaste,
      //   }}
      renderControls={() => <EditorMenuControls />}
      RichTextFieldProps={{
        // The "outlined" variant is the default (shown here only as
        // example), but can be changed to "standard" to remove the outlined
        // field border from the editor
        variant: "outlined",
        // MenuBarProps: {
        //   hide: !showMenuBar,
        // },
        // Below is an example of adding a toggle within the outlined field
        // for showing/hiding the editor menu bar, and a "submit" button for
        // saving/viewing the HTML content
      }}
    >
      {() => (
        <>
          <LinkBubbleMenu formatHref={(v) => v} />
          <TableBubbleMenu />
          <ColumnsBubbleMenu />
        </>
      )}
    </StyledEditor>
  );
};
