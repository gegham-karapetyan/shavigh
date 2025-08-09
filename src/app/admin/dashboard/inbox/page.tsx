"use client";

import { ErrorView } from "@/frontend/admin-dashboard/components/ErrorView";
import { InboxCard } from "@/frontend/admin-dashboard/components/InboxCard";
import { Loading } from "@/frontend/admin-dashboard/components/Loading";
import { GetInboxMessageModel } from "@/http-api/interfaces/inbox.models";
import { Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

const useGetInboxMessages = () => {
  return useQuery({
    queryKey: ["GET_INBOX_MESSAGES_QUERY_KEY"],
    queryFn: async () => {
      const { data } = await axios.get<GetInboxMessageModel[]>("/api/inbox");
      return data;
    },
  });
};

const useDeleteInboxMessage = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/inbox?id=${id}`);
    },
  });
};

export default function InboxPage() {
  const { data, isLoading, isError, refetch } = useGetInboxMessages();
  const { mutate: deleteInboxMessage, isPending } = useDeleteInboxMessage();
  const { enqueueSnackbar } = useSnackbar();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorView />;
  }
  const onDelete = (id: number) => {
    deleteInboxMessage(id, {
      onSuccess: () => {
        enqueueSnackbar("Message deleted successfully", { variant: "success" });
        refetch();
      },
      onError: () => {
        enqueueSnackbar("Failed to delete message", { variant: "error" });
      },
    });
  };
  return (
    <Stack
      direction="column"
      p={4}
      width="100%"
      gap={2}
      mx="auto"
      overflow="auto"
    >
      {!data?.length && (
        <Stack justifyContent="center" alignItems="center" height="500px">
          <Typography fontSize={30} color="text.secondary">
            No messages in your inbox.
          </Typography>
        </Stack>
      )}
      {data!.map((message) => (
        <InboxCard
          {...message}
          key={message.id}
          isPending={isPending}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
}
