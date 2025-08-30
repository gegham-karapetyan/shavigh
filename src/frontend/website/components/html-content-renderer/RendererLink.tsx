"use client";

import { useBasePath } from "@/frontend/shared/contexts/basepath-context";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export interface RendererLinkProps extends Omit<LinkProps, "href"> {
  href: string;
  target?: string;
}

export const RendererLink: FC<RendererLinkProps> = ({
  href = "",
  ...props
}) => {
  const pathname = usePathname();
  const basepath = useBasePath();
  let fullHref: string = href;

  if (href.trim()) {
    if (href.startsWith("//")) {
      //skip doesn't support
    } else if (href.startsWith("http")) {
      if (typeof window !== "undefined") {
        try {
          const url = new URL(href);
          if (url.origin === window.location.origin) {
            fullHref = `${basepath}${url.pathname}${url.search}${url.hash}`;
          }
        } catch {
          // invalid URL, leave as-is
        }
      }
    } else if (href.startsWith("/")) {
      fullHref = `${basepath}${href}`;
    } else {
      fullHref = `${pathname}/${href}`;
    }
  }
  // if (href && !href.startsWith("/") && !href.startsWith("http")) {
  //   fullHref = `${pathname}/${href}`;
  // }
  // if (href.startsWith("/") && !href.startsWith("//")) {
  //   fullHref = `${basepath ? basepath + "/" : ""}${href}`;
  // }

  return <Link {...props} target="_self" prefetch={false} href={fullHref} />;
};
