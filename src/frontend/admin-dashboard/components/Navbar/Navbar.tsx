// "use client";

import { Divider, IconButton, Stack, Box } from "@mui/material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { FC, useState } from "react";
import {
  NavbarMenuGroupItem,
  NavbarMenuGroupItemModel,
  NavbarMenuItemType,
  NavbarMenuSingleItem,
  NavbarMenuSingleItemModel,
} from "./ui/NavbarLinksGroup/NavbarMenuItems";

export type * from "./ui/NavbarLinksGroup/NavbarMenuItems";
export { NavbarMenuItemType } from "./ui/NavbarLinksGroup/NavbarMenuItems";

export interface NavbarProps {
  navItems: (NavbarMenuGroupItemModel | NavbarMenuSingleItemModel)[];
}
export const Navbar: FC<NavbarProps> = ({ navItems }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

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
    >
      <Box sx={{ textAlign: "right" }}>
        <IconButton
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          color="primary"
        >
          {isNavbarOpen ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
        <Divider />
      </Box>

      <Stack
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {navItems.map((item) =>
          item.type === NavbarMenuItemType.GROUP ? (
            <NavbarMenuGroupItem
              isFirstLevel
              onSelect={() => setIsNavbarOpen(true)}
              isNavbarOpen={isNavbarOpen}
              key={item.label}
              item={item}
            />
          ) : (
            <NavbarMenuSingleItem
              isFirstLevel
              onSelect={() => setIsNavbarOpen(true)}
              isNavbarOpen={isNavbarOpen}
              key={item.label}
              item={item}
            />
          )
        )}
      </Stack>
    </Stack>
  );
};
