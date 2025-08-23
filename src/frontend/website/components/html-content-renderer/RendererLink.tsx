"use client";

import { useBasePath } from "@/frontend/shared/contexts/basepath-context";
import { isAbsolutePath } from "@/frontend/shared/utils/path-utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export interface RendererLinkProps extends Omit<LinkProps, "href"> {
  href: string;
  target?: string;
}

export const RendererLink: FC<RendererLinkProps> = ({
  href = "",
  target: targetOrigin,
  ...props
}) => {
  const pathname = usePathname();
  const basepath = useBasePath();
  let fullHref: string = href;
  let target = targetOrigin;

  if (href.trim()) {
    if (href.startsWith("#")) {
      target = "_self";
    }
    fullHref = isAbsolutePath(href)
      ? `${basepath}${href}`
      : `${pathname}/${href}`;
  }
  // if (href && !href.startsWith("/") && !href.startsWith("http")) {
  //   fullHref = `${pathname}/${href}`;
  // }
  // if (href.startsWith("/") && !href.startsWith("//")) {
  //   fullHref = `${basepath ? basepath + "/" : ""}${href}`;
  // }

  return <Link {...props} target={target} prefetch={false} href={fullHref} />;
};
