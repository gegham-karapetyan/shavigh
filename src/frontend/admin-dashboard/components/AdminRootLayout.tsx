"use client";
import { FC, PropsWithChildren } from "react";
import { Navbar, NavbarMenuItemType, NavbarProps } from "./Navbar/Navbar";
import GridViewIcon from "@mui/icons-material/GridView";
import WebIcon from "@mui/icons-material/Web";
import MailIcon from "@mui/icons-material/MailOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Stack } from "@mui/material";
// import { useRouter } from "next/router";
// import { useParams } from "next/navigation";
// import { StaticPagesType } from "@/constants";

const menus: NavbarProps["navItems"] = [
  {
    type: NavbarMenuItemType.SINGLE,
    label: "Website",
    icon: WebIcon,
    // initiallyOpened: true,
    link: "/admin/dashboard/site-view",
  },
  {
    label: "New Pages",
    type: NavbarMenuItemType.GROUP,
    icon: GridViewIcon,
    items: [
      {
        type: NavbarMenuItemType.SINGLE,
        label: "Articles",
        link: "/admin/dashboard/articles",
      },
      {
        type: NavbarMenuItemType.SINGLE,
        label: "Bible Chapters",
        link: "/admin/dashboard/bible-chapters",
      },
      {
        type: NavbarMenuItemType.SINGLE,
        label: "Bible Pages",
        link: "/admin/dashboard/bible-pages",
      },
      {
        type: NavbarMenuItemType.SINGLE,
        label: "Saints Behavior Pages",
        link: "/admin/dashboard/saints-behavior-pages",
      },
    ],
  },

  {
    type: NavbarMenuItemType.SINGLE,
    label: "Inbox",
    link: "/admin/dashboard/inbox",
    icon: MailIcon,
  },

  {
    label: "Security",
    type: NavbarMenuItemType.GROUP,
    icon: SecurityOutlinedIcon,
    items: [
      // { type: NavbarMenuItemType.SINGLE, label: "Enable 2FA", link: "/" },
      // { type: NavbarMenuItemType.SINGLE, label: "Change password", link: "/" },
      {
        type: NavbarMenuItemType.SINGLE,
        label: "Logout",
        link: "/admin/logout",
      },
    ],
  },
];

export const AdminRootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack direction="row" gap={1} width="100%" height="100vh">
      <Navbar navItems={menus} />
      <Stack flex={1} height="100%" minWidth={0} overflow="hidden">
        {children}
      </Stack>
    </Stack>
  );
};
