export interface GetInboxMessageModel {
  id: number;
  localDate: string;
  content: string;
  url: string;
}
export interface CreateInboxMessageModel {
  content: string;
  url: string;
}
