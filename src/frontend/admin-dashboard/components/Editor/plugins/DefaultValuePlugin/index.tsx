import { useEffect, useRef } from "react";

import { $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, LexicalEditor } from "lexical";

export default function LexicalDefaultValuePlugin({
  value = null,
}: {
  value?: string | null;
}) {
  const [editor] = useLexicalComposerContext();
  const wasUpdatedRef = useRef(false);

  const updateHTML = (editor: LexicalEditor, value: string, clear: boolean) => {
    const root = $getRoot();
    const parser = new DOMParser();
    const dom = parser.parseFromString(value, "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);
    if (clear) {
      root.clear();
    }
    root.append(...nodes);
  };

  useEffect(() => {
    if (editor && value !== null && !wasUpdatedRef.current) {
      wasUpdatedRef.current = true;
      editor.update(() => {
        updateHTML(editor, value, true);
      });
    }
  }, [editor, value]);

  return null;
}
