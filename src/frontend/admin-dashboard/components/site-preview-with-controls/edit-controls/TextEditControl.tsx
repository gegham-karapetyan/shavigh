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
import { useRef, useState } from "react";
import { DraggableDialog } from "../../DraggableDialog";
import { mutateHandlers } from "../mutate-handlres";
import type { RichTextEditorRef } from "../../Editor/Editor";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";
import { useSnackbar } from "notistack";

const LazyEditor = dynamic(
  () => import("../../Editor/Editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <Skeleton variant="rectangular" height="500px" />,
  }
);

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
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<null | {
    identifier: `${EntitySelector}.${string}`;
    id: number;
  }>(null);

  const handleClose = () => setOpen(null);

  const { previewState } = useSitePreviewState();
  const sendToRefetch = useSendRefetchEvent();

  useOnEditEvent((data) => {
    if (
      data.blockType !== EditableBlockType.TEXT ||
      data.routeId !== previewState?.routeId
    ) {
      return;
    }
    setOpen({ identifier: data.editableBlockIdentifier, id: data.id });
  });
  const editorRef = useRef<RichTextEditorRef>(null);

  const isOpen = Boolean(open);
  if (!isOpen) {
    return null;
  }
  const defaultContent = getContent(open!.identifier, previewState!.data);

  const handleSave = async () => {
    if (!editorRef.current?.editor) return;
    setLoading(true);
    const dataCopy = JSON.parse(
      JSON.stringify(previewState!.data)
    ) as DefaultDataType;
    setContent(open!.identifier, dataCopy, editorRef.current.editor.getHTML());
    const entitySelector = open?.identifier.split(".")[0] as EntitySelector;

    const pageType = previewState!.data[entitySelector].pageType;
    try {
      await mutateHandlers[pageType].editHandler(dataCopy[entitySelector]);
      sendToRefetch({ type: "refetch" });
      handleClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DraggableDialog
      onSave={handleSave}
      title="Edit"
      open={isOpen}
      loading={loading}
      onClose={handleClose}
      size="xl"
    >
      {isOpen && (
        <LazyEditor editorRef={editorRef} defaultContent={defaultContent} />
      )}
    </DraggableDialog>
  );
};
