import { FC, memo } from "react";
import "./styles.css";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  attributesToProps,
  domToReact,
} from "html-react-parser";
import { Comment } from "./Comment";
import { RendererLink, RendererLinkProps } from "./RendererLink";

export interface HtmlContentRendererProps {
  content: string;
}
const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element) {
      if (domNode.name === "a") {
        if (domNode.attribs.class === "commentsPop") {
          return (
            <Comment content={domNode.attribs["data-info"]}>
              {domToReact(domNode.children as DOMNode[], options)}
            </Comment>
          );
        }
        return (
          <RendererLink
            {...(attributesToProps(
              domNode.attribs
            ) as unknown as RendererLinkProps)}
          >
            {domToReact(domNode.children as DOMNode[], options)}
          </RendererLink>
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
