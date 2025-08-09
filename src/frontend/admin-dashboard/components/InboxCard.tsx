"use client";
import { GetInboxMessageModel } from "@/http-api/interfaces/inbox.models";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FC, useState } from "react";
import parse from "html-react-parser";
import Link from "next/link";

export const InboxCard: FC<
  GetInboxMessageModel & { onDelete: (id: number) => void; isPending: boolean }
> = ({ content, localDate, id, onDelete, url, isPending }) => {
  const [open, setOpen] = useState(false);
  const contentChunk = content.replace(/<[^>]+>/g, "").slice(0, 60); // Remove HTML tags for display

  return (
    <Box>
      <Stack
        direction="row"
        flexWrap="nowrap"
        minWidth={500}
        p={1}
        width="100%"
        gap={2}
        boxShadow={1}
        border={1}
        borderColor="primary.main"
        alignItems="center"
        borderRadius={2}
      >
        <Box>
          <IconButton onClick={() => setOpen(!open)}>
            <KeyboardArrowDownIcon
              sx={{
                transition: "transform 0.2s ease-in-out",
                transform: open ? "rotate(0deg)" : "rotate(-90deg)",
              }}
            />
          </IconButton>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Typography flex={1}>{contentChunk}</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="subtitle1">
          {new Date(localDate).toLocaleDateString()}
        </Typography>
        <Divider orientation="vertical" flexItem />

        <Link href={url} target="_blank">
          Go To Page
        </Link>
        <Divider orientation="vertical" flexItem />

        <Box>
          <IconButton disabled={isPending} onClick={() => onDelete(id)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </Box>
      </Stack>
      <Collapse in={open}>
        <Box borderBottom={1} borderColor="primary.main" p={2}>
          {parse(content)}
        </Box>
      </Collapse>
    </Box>
  );
};
