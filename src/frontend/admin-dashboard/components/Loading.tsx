import { CircularProgress, Stack } from "@mui/material";

export const Loading = () => {
  return (
    <Stack
      minHeight="200px"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Stack>
  );
};
