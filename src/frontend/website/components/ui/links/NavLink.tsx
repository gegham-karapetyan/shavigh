"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, FC } from "react";
import { Button, ButtonProps } from "../buttons/Button";
import { useBasePath } from "@/frontend/shared/contexts/basepath-context";
import { isAbsolutePath } from "@/frontend/shared/utils/path-utils";
import { UrlObject } from "url";

export type NavLinkProps = ComponentPropsWithoutRef<typeof Link> &
  Pick<ButtonProps, "variant" | "size"> & {
    end?: boolean;
  };

function isActivePath(end: boolean, pathname: string, href?: string | null) {
  if (!pathname.trim() || !href?.trim()) return false;
  const indexOf = pathname.indexOf(href);
  if (indexOf === -1) return false;
  const lastCharacter = pathname[indexOf + href.length] as undefined | "/";

  const isIncluded =
    pathname[indexOf - (isAbsolutePath(href) ? 0 : 1)] === "/" &&
    (lastCharacter === "/" || lastCharacter === undefined);

  if (isIncluded) {
    if (end && lastCharacter !== undefined) {
      return false;
    }
    return true;
  }
  return false;
}

export const NavLink: FC<NavLinkProps> = ({
  variant = "mixed",
  end = false,
  href,
  ...rest
}) => {
  const pathname = usePathname();
  const basepath = useBasePath();
  const isHrefObject = typeof href === "object";
  const hrefPathname = isHrefObject ? href.pathname : href;
  const isAbsolute = isAbsolutePath(hrefPathname);
  const fullUrl: UrlObject = {
    ...(isHrefObject && href),
    pathname: isAbsolute ? `${basepath}${hrefPathname}` : hrefPathname,
  };
  const isActive = isActivePath(end, pathname, fullUrl.pathname);

  return (
    <Button
      component={Link}
      isActive={isActive}
      href={fullUrl}
      variant={variant}
      {...rest}
    />
  );
};
