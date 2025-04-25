"use client";

import { Divider, IconButton, Stack } from "@mui/material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";

import {
  NavbarLinksGroup,
  NavbarLinksGroupProps,
} from "./ui/NavbarLinksGroup/NavbarLinksGroup";
// import clsx from "clsx";
import { useState } from "react";

export interface NavbarProps {
  linkItems: NavbarLinksGroupProps[];
}
export function Navbar({ linkItems }: NavbarProps) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  return (
    <Stack
      height="100%"
      component="nav"
      bgcolor="background.default"
      boxShadow={3}
      borderRight={(t) => `1px solid ${t.palette.divider}`}
      sx={{
        overflow: "hidden",
        transition: "width 0.3s ease-in-out",
        width: isNavbarOpen ? "300px" : "50px",
      }}
      // className={clsx(
      //   "transition-[width] overflow-hidden",
      //   isNavbarOpen ? "w-2xs" : "w-[50px]"
      // )}
    >
      <div className="text-right">
        <IconButton
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          color="primary"
        >
          {isNavbarOpen ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
        <Divider />
      </div>

      <div className="overflow-y-auto overflow-x-hidden">
        {linkItems.map((item) => (
          <NavbarLinksGroup
            {...item}
            isNavbarOpen={isNavbarOpen}
            onNavbarOpen={() => setIsNavbarOpen(true)}
            key={item.label}
          />
        ))}
      </div>
    </Stack>
  );
}
