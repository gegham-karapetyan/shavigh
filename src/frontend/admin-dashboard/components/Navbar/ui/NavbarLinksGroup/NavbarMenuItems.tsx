import {
  useIsRouteMatches,
  useNavLink,
} from "@/frontend/shared/hooks/useNavLink";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import GridViewIcon from "@mui/icons-material/GridView";

import {
  alpha,
  Box,
  Button,
  ButtonTypeMap,
  Collapse,
  ExtendButtonBase,
  Stack,
  styled,
  SvgIconTypeMap,
  Tooltip,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import { FC, useState } from "react";
import { findAllNestedLinks } from "./findAllNestedLinks";

export const enum NavbarMenuItemType {
  SINGLE = "single",
  GROUP = "group",
}
interface NavbarMenuItemBaseModel {
  type: NavbarMenuItemType;
  label: string;
}

export interface NavbarMenuSingleItemModel extends NavbarMenuItemBaseModel {
  type: NavbarMenuItemType.SINGLE;
  link: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  label: string;
}

export interface NavbarMenuGroupItemModel {
  type: NavbarMenuItemType.GROUP;
  label: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  items: (NavbarMenuGroupItemModel | NavbarMenuSingleItemModel)[];
}
interface NavbarMenuItemBaseProps {
  isNavbarOpen: boolean;
  onSelect: () => void;
  isFirstLevel?: boolean;
}

export interface NavbarMenuSingleItemProps extends NavbarMenuItemBaseProps {
  item: NavbarMenuSingleItemModel;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  position: "relative",
  whiteSpace: "nowrap",
  textTransform: "none",
  width: "100%",
  "&:before": {
    content: '""',
    position: "absolute",
    transition: "all 0.3s ease-in-out",
    top: 0,
    left: 0,
    width: "3px",
    height: isActive ? "100%" : 0,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    backgroundColor: isActive ? theme.palette.primary.main : "transparent",
  },
})) as ExtendButtonBase<ButtonTypeMap<{ isActive: boolean }, "button">>;

const IconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.2),
  color: theme.palette.primary.main,
}));

interface MenuIconProps {
  icon?: OverridableComponent<SvgIconTypeMap>;
  isFirstLevel?: boolean;
  isNavbarOpen?: boolean;
  label: string;
}

const MenuIcon: FC<MenuIconProps> = ({
  label,
  icon,
  isFirstLevel,
  isNavbarOpen,
}) => {
  const Icon = icon;
  if (isFirstLevel) {
    return (
      <Tooltip title={!isNavbarOpen && label} placement="right" arrow>
        <IconWrapper>
          {Icon ? (
            <Icon sx={{ verticalAlign: "middle" }} />
          ) : (
            <GridViewIcon sx={{ verticalAlign: "middle" }} />
          )}
        </IconWrapper>
      </Tooltip>
    );
  }
  return Icon ? <Icon sx={{ verticalAlign: "middle" }} /> : null;
};
export const NavbarMenuSingleItem: FC<NavbarMenuSingleItemProps> = ({
  item,
  isNavbarOpen,
  onSelect,
  isFirstLevel,
}) => {
  const { url, isActive } = useNavLink(item.link, true);
  return (
    <StyledButton
      onClick={onSelect}
      isActive={isActive}
      component={Link}
      href={url as unknown as string}
    >
      <Stack
        width="100%"
        alignItems="center"
        justifyContent="flex-start"
        direction="row"
        gap={2}
      >
        <MenuIcon
          isNavbarOpen={isNavbarOpen}
          icon={item.icon}
          label={item.label}
          isFirstLevel={isFirstLevel}
        />
        {isNavbarOpen && <Typography variant="body2">{item.label}</Typography>}
      </Stack>
    </StyledButton>
  );
};

export interface NavbarMenuGroupItemProps extends NavbarMenuItemBaseProps {
  item: NavbarMenuGroupItemModel;
}

export const NavbarMenuGroupItem: FC<NavbarMenuGroupItemProps> = ({
  item,
  isNavbarOpen,
  onSelect,
  isFirstLevel,
}) => {
  const allNestedLink = findAllNestedLinks(item);
  const isActive = useIsRouteMatches(allNestedLink);
  const [opened, setOpened] = useState(isActive && isNavbarOpen);
  return (
    <Box>
      <StyledButton
        isActive={isActive}
        onClick={() => {
          onSelect();
          setOpened(!opened);
        }}
      >
        <Stack
          width="100%"
          alignItems="center"
          justifyContent="flex-start"
          direction="row"
          gap={2}
        >
          <MenuIcon
            isNavbarOpen={isNavbarOpen}
            icon={item.icon}
            label={item.label}
            isFirstLevel={isFirstLevel}
          />

          {isNavbarOpen && (
            <Typography variant="body2">{item.label}</Typography>
          )}

          <Box
            component="span"
            sx={{ flex: 1, textAlign: "right" }}
            color="common.black"
          >
            <KeyboardArrowRightIcon
              fontSize="small"
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          </Box>
        </Stack>
      </StyledButton>
      <Collapse in={opened && isNavbarOpen}>
        <Stack
          ml={3}
          pl={2}
          gap={1}
          borderLeft="1px solid"
          borderColor="divider"
        >
          {item.items.map((item) => {
            return item.type === NavbarMenuItemType.SINGLE ? (
              <NavbarMenuSingleItem
                isNavbarOpen={isNavbarOpen}
                onSelect={onSelect}
                key={item.label}
                item={item}
              />
            ) : (
              <NavbarMenuGroupItem
                isNavbarOpen={isNavbarOpen}
                onSelect={onSelect}
                key={item.label}
                item={item}
              />
            );
          })}
        </Stack>
      </Collapse>
    </Box>
  );
};
