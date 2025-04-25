"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, FC } from "react";
import { Button, ButtonProps } from "../buttons/Button";
import { useBasePath } from "@/frontend/shared/contexts/basepath-context";
import { isAbsolutePath } from "@/frontend/shared/utils/path-utils";
import { UrlObject } from "url";

export type NavLinkProps = ComponentPropsWithoutRef<typeof Link> &
  Pick<ButtonProps, "variant">;

export const NavLink: FC<NavLinkProps> = ({
  variant = "mixed",
  href,
  ...rest
}) => {
  const pathname = usePathname();
  const basepath = useBasePath();
  const isHrefObject = typeof href === "object";
  const hrefPathname = isHrefObject ? href.pathname : href;
  const fullUrl: UrlObject = {
    ...(isHrefObject && href),
    pathname: isAbsolutePath(hrefPathname)
      ? `${basepath}${hrefPathname}`
      : hrefPathname,
  };
  const isActive = decodeURIComponent(pathname) === fullUrl.pathname;

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
