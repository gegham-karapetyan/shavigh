import {
  useOnEditEvent,
  useSendRefetchEvent,
} from "@/frontend/admin-dashboard/contexts/dashboard-messaging-context";
import { useSitePreviewState } from "@/frontend/admin-dashboard/contexts/site-preview-state-context";
import {
  DefaultDataType,
  EditableBlockType,
  EntitySelector,
} from "@/frontend/admin-dashboard/contexts/types";
import RichTextEditor from "../../Editor/RichTextEditor";
import { useRef, useState } from "react";
import { DraggableDialog } from "../../DraggableDialog";
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
  const [open, setOpen] = useState<null | {
    identifier: `${EntitySelector}.${string}`;
    id: number;
  }>(null);

  const handleClose = () => setOpen(null);

  const { previewState } = useSitePreviewState();
  const sendToRefetch = useSendRefetchEvent();

  console.log("previewState", previewState);

  useOnEditEvent((data) => {
    if (
      data.blockType !== EditableBlockType.TEXT ||
      data.routeId !== previewState?.routeId
    ) {
      return;
    }
    setOpen({ identifier: data.editableBlockIdentifier, id: data.id });
  });
  const editorRef = useRef("");

  const isOpen = Boolean(open);
  if (!isOpen) {
    return null;
  }
  const defaultContent = getContent(open!.identifier, previewState!.data);

  const handleSave = async () => {
    const dataCopy = JSON.parse(
      JSON.stringify(previewState!.data)
    ) as DefaultDataType;
    setContent(open!.identifier, dataCopy, editorRef.current);
    const entitySelector = open?.identifier.split(".")[0] as EntitySelector;

    const pageType = previewState!.data[entitySelector].pageType;
    try {
      await mutateHandlers[pageType].editHandler(dataCopy[entitySelector]);
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
      size="xl"
    >
      {isOpen && (
        <RichTextEditor
          onChange={({ getHTML }) => (editorRef.current = getHTML())}
          namespace={open!.identifier}
          defaultValue={`<div>${defaultContent}</div>`}
        />
      )}
    </DraggableDialog>
  );
};
