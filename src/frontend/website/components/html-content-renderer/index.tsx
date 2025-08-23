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
}
const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element) {
      if (domNode.attribs["data-info"]) {
        return (
          <Tooltip text={domNode.attribs["data-info"]}>
            {domToReact(domNode.children as DOMNode[], options)}
          </Tooltip>
        );
      }
      if (domNode.name === "a") {
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
    return (
      <Fragment>
        <div className="scalable-section">{parse(content, options)}</div>
        <IdToAnchorScrollerPlugin selector=".scalable-section" />
      </Fragment>
    );
  }
);
HtmlContentRenderer.displayName = "HtmlContentRenderer";
