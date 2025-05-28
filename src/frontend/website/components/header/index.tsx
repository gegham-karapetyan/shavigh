// import Link from "next/link";
import logo from "@/frontend/website/media/icons/shavigh-logo.svg?url";

import Image from "next/image";
import { NavBar } from "../nav-bar";

import { NavLink } from "../ui/links/NavLink";

// import { omit } from "@/utils/object-utils";

export const Header = () => {
  return (
    <header className="flex z-10 sticky bg-white top-0 left-0 items-center justify-between gap-1 px-2.5 lg:py-1 2xl:py-6 lg:px-[64px] shadow-md">
      <NavLink href="/" variant="text">
        <Image className="w-44 lg:w-52 2xl:w-2xs" src={logo} alt="logo" />
      </NavLink>

      <NavBar />
    </header>
  );
};
