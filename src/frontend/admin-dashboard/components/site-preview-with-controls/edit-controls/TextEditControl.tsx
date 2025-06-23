import {
  useOnEditEvent,
  useSendRefetchEvent,
} from "@/frontend/admin-dashboard/contexts/dashboard-messaging-context";
import { useSitePreviewState } from "@/frontend/admin-dashboard/contexts/site-preview-state-context";
import { EditableBlockType } from "@/frontend/admin-dashboard/contexts/types";
import RichTextEditor from "../../Editor/RichTextEditor";
import { useRef, useState } from "react";
import { DraggableDialog } from "./DraggableDialog";
import { mutateHandlers } from "../mutate-handlres";

const getContent = (identifier: string, data: unknown) => {
  return identifier.split(".").reduce((acc, pathChunk) => {
    if (acc && typeof acc === "object" && pathChunk in acc) {
      return (acc as Record<string, unknown>)[pathChunk];
    }
    return "";
  }, data) as string;
};

const setContent = (identifier: string, data: unknown, value: string) => {
  const pathChunks = identifier.split(".");
  let lastObj = data;

  for (const pathChunk of pathChunks) {
    if (typeof (lastObj as Record<string, unknown>)[pathChunk] === "object") {
      lastObj = (lastObj as Record<string, unknown>)[pathChunk];
    } else {
      (lastObj as Record<string, unknown>)[pathChunk] = value;
    }
  }
};

export const TextEditControl = () => {
  const [open, setOpen] = useState<null | { identifier: string }>(null);

  const handleClose = () => setOpen(null);

  const { previewState } = useSitePreviewState();
  const sendToRefetch = useSendRefetchEvent();

  useOnEditEvent((data) => {
    if (
      data.blockType !== EditableBlockType.TEXT ||
      data.id !== previewState?.id
    ) {
      return;
    }
    setOpen({ identifier: data.identifier });
  });
  const editorRef = useRef("");

  const isOpen = Boolean(open);
  if (!isOpen) {
    return null;
  }
  const defaultContent = getContent(open!.identifier, previewState!.data);

  const handleSave = async () => {
    const dataCopy = JSON.parse(JSON.stringify(previewState!.data));
    setContent(open!.identifier, dataCopy, editorRef.current);
    try {
      await mutateHandlers[previewState!.pageType].editHandler(dataCopy);
      sendToRefetch({ type: "refetch" });
      handleClose();
    } catch (error) {
      console.error("Failed to save content:", error);
      // Handle error appropriately, e.g., show a notification
    }
  };

  return (
    <DraggableDialog
      onSave={handleSave}
      title="Edit"
      open={isOpen}
      onClose={handleClose}
    >
      <RichTextEditor
        onChange={({ getHTML }) => (editorRef.current = getHTML())}
        namespace={previewState!.id.toString()}
        defaultValue={`<div>${defaultContent}</div>`}
      />
    </DraggableDialog>
  );
};
