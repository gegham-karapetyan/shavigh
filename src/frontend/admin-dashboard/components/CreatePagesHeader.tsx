import { Stack, Box, Tabs, Tab, Button } from "@mui/material";
import { FC } from "react";

export interface CreatePageHeaderProps {
  createButtonTitle: string;
  activeTab: string;
  onTabSelect: (label: string) => void;
  onCreateButtonClick: () => void;
  tabs: [
    {
      label: string;
    }
  ];
}

export const CreatePageHeader: FC<CreatePageHeaderProps> = ({
  activeTab,
  createButtonTitle,
  tabs,
  onCreateButtonClick,
  onTabSelect,
}) => {
  return (
    <Stack
      pt={1}
      gap={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottom={1}
      borderColor={(t) => t.palette.divider}
    >
      <Box flex={1} borderRight={1} borderColor={(t) => t.palette.divider}>
        <Tabs value={activeTab} onChange={(_, value) => onTabSelect(value)}>
          {tabs.map((tab) => (
            <Tab key={tab.label} value={tab.label} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Box>
        <Button onClick={onCreateButtonClick} variant="contained">
          {createButtonTitle}
        </Button>
      </Box>
    </Stack>
  );
};
