"use client";

import { useBasePath } from "@/frontend/shared/contexts/basepath-context";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export interface RendererLinkProps extends Omit<LinkProps, "href"> {
  href: string;
}

export const RendererLink: FC<RendererLinkProps> = ({
  href = "",
  ...props
}) => {
  const pathname = usePathname();
  const basepath = useBasePath();
  let fullHref: string = href;
  if (href && !href.startsWith("/") && !href.startsWith("http")) {
    fullHref = `${pathname}/${href}`;
  }
  if (href.startsWith("/") && !href.startsWith("//")) {
    fullHref = `${basepath ? basepath + "/" : ""}${href}`;
  }

  return <Link {...props} href={fullHref} />;
};
