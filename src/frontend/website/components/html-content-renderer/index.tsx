import { FC } from "react";
import parse from "html-react-parser";

export interface HtmlContentRendererProps {
  content: string;
}
export const HtmlContentRenderer: FC<HtmlContentRendererProps> = ({
  content,
}) => {
  return parse(content);
};
