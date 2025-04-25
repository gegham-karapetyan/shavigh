import { Stack, Tooltip, Chip } from "@mui/material";

export const PageStateIndicators = () => {
  return (
    <Stack direction="row" textAlign="center" gap={1}>
      <Tooltip title="original">
        <Chip
          color="success"
          variant="outlined"
          size="small"
          label="Content State : Original"
        />
      </Tooltip>
      <Tooltip title="active">
        <Chip
          color="success"
          size="small"
          variant="outlined"
          label="Status : Active"
        />
      </Tooltip>
    </Stack>
  );
};
