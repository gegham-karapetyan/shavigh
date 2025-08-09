"use client";
import { IconButton } from "@mui/material";
import { FC, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

export const CopyBtn: FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };
  return (
    <IconButton disabled={copied} onClick={() => copyToClipboard(value)}>
      {copied ? <DoneIcon color="success" /> : <ContentCopyIcon />}
    </IconButton>
  );
};
