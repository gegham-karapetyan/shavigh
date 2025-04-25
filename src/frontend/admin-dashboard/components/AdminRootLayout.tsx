"use client";
import {
  FC,
  Fragment,
  memo,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Navbar } from "./Navbar/Navbar";
import GridViewIcon from "@mui/icons-material/GridView";
import { Stack, Box, Button } from "@mui/material";
// import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { StaticPagesType } from "@/constants";

const mockdata = [
  {
    label: "website",
    icon: GridViewIcon,
    initiallyOpened: true,
    link: "/admin/dashboard/site-view/",
    // links: [
    //   { label: "Գլխավոր", link: "/admin/dashboard/site-view/home" },
    //   { label: "Հավատք", link: "/admin/dashboard/site-view/fait" },
    //   {
    //     label: "Վարք Սրբոց",
    //     link: "/admin/dashboard/site-view/sanctuary-attitude",
    //   },
    //   { label: "Գրքեր", link: "/admin/dashboard/site-view/books" },
    //   { label: "Հոդվածներ", link: "/admin/dashboard/site-view/articles" },
    //   { label: "Պոդքաստներ", link: "/admin/dashboard/site-view/podcasts" },
    // ],
  },
  {
    label: "Create New Pages",
    icon: GridViewIcon,
    links: [
      { label: "Create Article", link: "/" },
      { label: "Create Book", link: "/" },
    ],
  },
  { label: "Analytics", link: "/", icon: GridViewIcon },
  { label: "Inbox", link: "/", icon: GridViewIcon },

  {
    label: "Security",
    icon: GridViewIcon,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];

export const AdminRootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack direction="row" gap={1} width="100%" height="100vh">
      <Navbar linkItems={mockdata} />
      <Stack flex={1} height="100%" minWidth={0} overflow="hidden">
        {children}
      </Stack>
    </Stack>
  );
};
