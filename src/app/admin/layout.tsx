"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { PropsWithChildren } from "react";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/frontend/admin-dashboard/components/admin-theme";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useRouter } from "next/navigation";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// const useGetMe = () => {
//   return useQuery({
//     queryKey: ["GET_ME_QUERY_KEY"],
//     queryFn: async () => {
//       const { data } = await axios.get("/api/auth/get-me");
//       return data;
//     },
//   });
// };

// const RedirectToLogin = () => {
//   const router = useRouter();
//   useEffect(() => {
//     router.push("/admin/login");
//   }, [router]);
//   return null;
// };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <QueryClientProvider client={queryClient}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
