import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import { Button, ButtonGroup } from "@mui/material";
import { FC } from "react";

export interface IDeviceControls {
  width: string;
  setWidth: (width: string) => void;
}
export const DeviceControls: FC<IDeviceControls> = ({ setWidth, width }) => {
  return (
    <ButtonGroup
      size="small"
      variant="outlined"
      disableRipple
      aria-label="Basic button group"
    >
      <Button
        size="small"
        sx={{ p: 0.2 }}
        onClick={() => setWidth("100%")}
        variant={width === "100%" ? "contained" : "outlined"}
      >
        auto
      </Button>
      <Button
        sx={{ p: 0.2 }}
        onClick={() => setWidth("360px")}
        variant={width === "360px" ? "contained" : "outlined"}
      >
        <PhoneIphoneIcon fontSize="small" />
      </Button>
      <Button
        sx={{ p: 0.2 }}
        onClick={() => setWidth("1200px")}
        variant={width === "1200px" ? "contained" : "outlined"}
      >
        <TabletMacIcon fontSize="small" />
      </Button>
      <Button
        sx={{ p: 0.2 }}
        onClick={() => setWidth("1920px")}
        variant={width === "1920px" ? "contained" : "outlined"}
      >
        <PersonalVideoIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
};
