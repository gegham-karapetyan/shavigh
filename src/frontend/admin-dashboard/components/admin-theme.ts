"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 30px transparent inset !important",
            WebkitTextFillColor: "inherit !important", // Inherit text color from parent
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
  },
});
