import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { MenuButton, useRichTextEditorContext } from "mui-tiptap";
export const MenuButtonCols = () => {
  const editor = useRichTextEditorContext();

  const disabled =
    !editor?.isEditable ||
    editor.isActive("columns") ||
    editor.isActive("heading") ||
    editor.isActive("codeBlock") ||
    !editor.can().insertColumns?.({ cols: 2 });

  return (
    <MenuButton
      disabled={disabled}
      onClick={() => {
        editor?.chain().focus().insertColumns({ cols: 2 }).run();
      }}
      tooltipLabel="Columns"
      IconComponent={ViewColumnIcon}
    />
  );
};
