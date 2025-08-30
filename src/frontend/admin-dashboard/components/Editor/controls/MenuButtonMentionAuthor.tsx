import { MenuButton, useRichTextEditorContext } from "mui-tiptap";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

export const MenuButtonMentionAuthor = () => {
  const editor = useRichTextEditorContext();

  const isActive = editor?.isActive("mentionAuthor");
  const disabled = !editor || editor.state.selection.empty;

  const handleClick = () => {
    if (!editor) return;

    if (editor.isActive("mentionAuthor")) {
      editor.commands.unsetWholeAuthorMention(); // <- removes entire mention
    } else {
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to, " ", " ");
      if (selectedText.trim()) {
        editor.chain().focus().setAuthorMention({ author: selectedText }).run();
      }
    }
  };

  return (
    <MenuButton
      selected={!!isActive}
      onClick={handleClick}
      tooltipLabel="Mention Author"
      disabled={disabled}
      IconComponent={PersonIcon}
    />
  );
};
