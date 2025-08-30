import { FC, Fragment, memo } from "react";
import "./styles.css";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  attributesToProps,
  domToReact,
} from "html-react-parser";
import { Tooltip } from "./Tooltip";
import { RendererLink, RendererLinkProps } from "./RendererLink";
import { IdToAnchorScrollerPlugin } from "./IdToAnchorScrollerPlugin";

export interface HtmlContentRendererProps {
  content: string;
  className?: string;
}
const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element) {
      if (domNode.name !== "a" && domNode.attribs["data-info"]) {
        return (
          <Tooltip
            text={domNode.attribs["data-info"]}
            {...attributesToProps(domNode.attribs)}
          >
            {domToReact(domNode.children as DOMNode[], options)}
          </Tooltip>
        );
      }
      if (domNode.name === "a") {
        const a = (
          <RendererLink
            {...(attributesToProps(
              domNode.attribs
            ) as unknown as RendererLinkProps)}
          >
            {domToReact(domNode.children as DOMNode[], options)}
          </RendererLink>
        );
        if (domNode.attribs["data-info"]) {
          return (
            <Tooltip
              text={domNode.attribs["data-info"]}
              {...attributesToProps(domNode.attribs)}
            >
              {a}
            </Tooltip>
          );
        }
        return a;
      }
    }
  },
};

export const HtmlContentRenderer: FC<HtmlContentRendererProps> = memo(
  ({ content, className }) => {
    return (
      <Fragment>
        <div className={`scalable-section ${className || ""}`}>
          {parse(content, options)}
        </div>
        <IdToAnchorScrollerPlugin selector=".scalable-section" />
      </Fragment>
    );
  }
);
HtmlContentRenderer.displayName = "HtmlContentRenderer";
