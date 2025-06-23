"use client";

import Link from "next/link";
import { ComponentPropsWithoutRef, FC } from "react";
import { Button, ButtonProps } from "../buttons/Button";
import { useNavLink } from "@/frontend/shared/hooks/useNavLink";

export type NavLinkProps = ComponentPropsWithoutRef<typeof Link> &
  Pick<ButtonProps, "variant" | "size"> & {
    end?: boolean;
  };

export const NavLink: FC<NavLinkProps> = ({
  variant = "mixed",
  end = false,
  href,
  ...rest
}) => {
  const { isActive, url } = useNavLink(href, end);

  return (
    <Button
      component={Link}
      isActive={isActive}
      href={url}
      variant={variant}
      {...rest}
    />
  );
};
