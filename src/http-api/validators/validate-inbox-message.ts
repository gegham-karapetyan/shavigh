import { object, string } from "yup";
import { CreateInboxMessageModel } from "../interfaces/inbox.models";

export const validateInboxMessage = async (body: CreateInboxMessageModel) => {
  const schema = object<CreateInboxMessageModel>().shape({
    content: string().required("Content is required"),
    url: string().min(5).required("URL is required"),
  });

  return await schema.isValid(body);
};
