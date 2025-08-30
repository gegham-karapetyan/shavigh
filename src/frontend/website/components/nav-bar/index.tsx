"use client";
import { FC, useEffect, useState } from "react";
import SearchIcon from "@/frontend/website/media/icons/search-icon.svg";
import Image from "next/image";
import { IconButton } from "../ui/buttons/IconButton";
import { NavLink } from "../ui/links/NavLink";
import MenuIcon from "@/frontend/website/media/icons/burger-menu.svg";
import CloseIcon from "@/frontend/website/media/icons/close-icon.svg";
import logo from "@/frontend/website/media/icons/shavigh-logo.svg?url";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const LogoComponent = (
  <NavLink prefetch={false} variant="text" href="/">
    <Image className="w-20" src={logo} alt="logo" />
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
    href: "/saintsbehavior",
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
            <NavLink
              prefetch={false}
              className="font-bold hover:no-underline!"
              href={href}
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li className="mt-1">
          <IconButton
            component={NavLink}
            href="/search"
            size="xl"
            variant="text"
            className="hover:no-underline!"
          >
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
          <MenuIcon className="p-3" />
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
            <CloseIcon className="p-3" />
          </IconButton>
        </div>
        <ul className="px-5 pb-5">
          <li>
            <IconButton
              component={NavLink}
              href="/search"
              size="xl"
              variant="text"
            >
              <SearchIcon />
            </IconButton>
          </li>
          {routes.map(({ href, label }, index) => (
            <li key={label}>
              <NavLink
                prefetch={false}
                href={href}
                variant="text"
                className="pt-5 pb-4 text-xl block hover:no-underline!"
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
