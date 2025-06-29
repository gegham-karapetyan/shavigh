import { Stack, Typography } from "@mui/material";

export const ErrorView = () => {
  return (
    <Stack
      minHeight="200px"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography color="error">Error</Typography>
    </Stack>
  );
};
