import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { PropsWithChildren } from "react";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/frontend/admin-dashboard/components/admin-theme";
import { QueryProvider } from "@/frontend/admin-dashboard/components/site-pages/QueryProvider";
import { CssBaseline } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout(props: PropsWithChildren) {
  console.log("Root Layout");
  return (
    <html lang="en">
      <CssBaseline />
      <body className={roboto.variable}>
        <QueryProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
          </AppRouterCacheProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
