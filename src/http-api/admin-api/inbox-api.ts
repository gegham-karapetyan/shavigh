import { fetcher } from "../fetcher";
import { GetInboxMessageModel } from "../interfaces/inbox.models";

export const inboxApi = {
  getInboxMessages() {
    return fetcher<GetInboxMessageModel[]>("/inbox");
  },
  deleteInboxMessage(id: number) {
    return fetcher<void>(`/inbox/${id}`, {
      method: "DELETE",
    });
  },
};
