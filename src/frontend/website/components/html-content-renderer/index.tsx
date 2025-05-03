import { FC, memo } from "react";
import "./styles.css";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  attributesToProps,
  domToReact,
} from "html-react-parser";
import Link, { LinkProps } from "next/link";
import { Comment } from "./Comment";

export interface HtmlContentRendererProps {
  content: string;
}
const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element) {
      if (domNode.name === "a") {
        return (
          <Link
            {...(attributesToProps(domNode.attribs) as unknown as LinkProps)}
          >
            {domToReact(domNode.children as DOMNode[], options)}
          </Link>
        );
      }

      if (domNode.attribs.class === "commentsPop") {
        return (
          <Comment content={domNode.attribs["data-info"]}>
            {domToReact(domNode.children as DOMNode[], options)}
          </Comment>
        );
      }
    }
  },
};

export const HtmlContentRenderer: FC<HtmlContentRendererProps> = memo(
  ({ content }) => {
    return <div className="scalable-section">{parse(content, options)}</div>;
  }
);
HtmlContentRenderer.displayName = "HtmlContentRenderer";
