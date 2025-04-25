import { FC, useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import Link, { LinkProps } from "next/link";
import {
  Collapse,
  Button,
  ButtonProps,
  Typography,
  Stack,
  Box,
  alpha,
  SxProps,
  Theme,
  TooltipProps,
  Tooltip,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface NavbarLinkBase {
  icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
  isNavbarOpen?: boolean;
  onNavbarOpen?: () => void;
}
interface NavbarSingleLink extends NavbarLinkBase {
  link: string;
  links: undefined;
}
interface NavbarGroupsLink extends NavbarLinkBase {
  link: undefined;
  links: {
    label: string;
    link: string;
    icon?: OverridableComponent<SvgIconTypeMap>;
  }[];
}

export type NavbarLinksGroupProps = NavbarLinkBase &
  (NavbarSingleLink | NavbarGroupsLink);

const buttonSx: SxProps<Theme> = {
  textTransform: "none",
  color: (t) => t.palette.text.primary,
};

interface WithTooltipProps extends TooltipProps {
  show: boolean;
}
const WithTooltip: FC<WithTooltipProps> = ({ show, children, ...rest }) => {
  return show ? (
    <Tooltip placement="right" arrow {...rest}>
      {children}
    </Tooltip>
  ) : (
    children
  );
};

export function NavbarLinksGroup({
  icon: Icon,
  label,
  isNavbarOpen,
  links,
  link,
  onNavbarOpen,
}: NavbarLinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(false);
  const items = (hasLinks ? links : []).map((link) => (
    <Button sx={buttonSx} component={Link} href={link.link} key={link.label}>
      <Stack
        width="100%"
        alignItems="center"
        justifyContent="flex-start"
        direction="row"
        gap={2}
      >
        {link.icon && <link.icon sx={{ verticalAlign: "center" }} />}
        <Typography ml={2} variant="body2">
          {link.label}
        </Typography>
      </Stack>
    </Button>
  ));
  useEffect(() => {
    if (!isNavbarOpen) {
      setOpened(false);
    }
  }, [isNavbarOpen]);

  const rootProps = hasLinks
    ? {
        onClick: () => {
          setOpened((o) => !o);
          if (!isNavbarOpen) {
            onNavbarOpen?.();
          }
        },
      }
    : ({
        component: Link,
        href: link! as LinkProps["href"],
      } as ButtonProps);

  return (
    <>
      <Button sx={buttonSx} variant="text" fullWidth {...rootProps}>
        <Stack
          width="100%"
          component="span"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" gap={2} alignItems="center">
            <WithTooltip show={!isNavbarOpen} title={label}>
              <Box
                bgcolor={(t) => alpha(t.palette.primary.light, 0.2)}
                color="primary.main"
                p={1}
                borderRadius={2}
              >
                <Icon />
              </Box>
            </WithTooltip>

            <Typography whiteSpace="nowrap">{label}</Typography>
          </Stack>
          {hasLinks && (
            <Box component="span" color="common.black">
              <KeyboardArrowRightIcon
                // stroke="currentColor"
                fontSize="small"
                style={{ transform: opened ? "rotate(-90deg)" : "none" }}
              />
            </Box>
          )}
        </Stack>
      </Button>
      {hasLinks && (
        <Collapse in={opened}>
          <Stack ml={3} gap={1} borderLeft="1px solid" borderColor="divider">
            {items}
          </Stack>
        </Collapse>
      )}
    </>
  );
}
