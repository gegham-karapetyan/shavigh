"use client";
import { FC, useEffect, useState } from "react";
// import Link from "next/link";
import logo from "@/frontend/website/media/images/logo.svg";
import SearchIcon from "@mui/icons-material/Search";

import Image, { ImageProps } from "next/image";
import { IconButton } from "../ui/buttons/IconButton";
import { NavLink } from "../ui/links/NavLink";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import { omit } from "lodash-es";
import { usePathname } from "next/navigation";

const logoProps = omit(logo, ["blurWidth", "blurHeight"]) as ImageProps;

const LogoComponent = (
  <NavLink variant="text" href="/">
    <Image {...logoProps} alt="logo" />
  </NavLink>
);

const routes = [
  {
    label: "ԱՍՏՎԱԾԱՇՈՒՆՉ",
    href: "/bible",
  },
  {
    label: "ՀԱՎԱՏՔ",
    href: "/faith",
  },
  {
    label: "ՎԱՐՔ ՍՐԲՈՑ",
    href: "/sanctuary-attitude",
  },
  {
    label: "ԳՐՔԵՐ",
    href: "/books",
  },
  {
    label: "ՀՈԴՎԱԾՆԵՐ",
    href: "/articles",
  },
  {
    label: "ՊՈԴՔԱՍՏՆԵՐ",
    href: "/podcasts",
  },
];

export interface NavBarProps {
  className?: string;
}

export const NavBar: FC<NavBarProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="w-full flex justify-end items-center">
      <ul className="hidden flex-row items-center gap-5 2xl:gap-10 xl:flex">
        {routes.map(({ href, label }) => (
          <li key={label}>
            <NavLink className="font-bold" href={href}>
              {label}
            </NavLink>
          </li>
        ))}
        <li className="mt-3">
          <IconButton size="xl" variant="text">
            <SearchIcon />
          </IconButton>
        </li>
      </ul>
      <div className="xl:hidden">
        <IconButton
          size="xl"
          variant="text"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <div
        className={clsx(
          "xl:hidden duration-300 transition overflow-auto bg-white p-1 fixed top-0 left-0 bottom-0 right-0",
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-90"
        )}
      >
        <div className="flex flex-row justify-between items-center">
          {LogoComponent}
          <IconButton
            size="xl"
            variant="text"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <ul className="px-5 pb-5">
          <li>
            <IconButton size="lg" variant="text">
              <SearchIcon />
            </IconButton>
          </li>
          {routes.map(({ href, label }, index) => (
            <li key={label}>
              <NavLink
                href={href}
                variant="text"
                className="pt-5 pb-4 text-xl block"
              >
                {label}
              </NavLink>
              {index !== routes.length - 1 && (
                <hr className="border-gray-400" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
