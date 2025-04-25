import { PropsWithChildren } from "react";
import "@/frontend/website/global.css";
import { ConfigBar } from "@/frontend/website/components/config-bar";
import { Header } from "@/frontend/website/components/header";
import { Footer } from "@/frontend/website/components/Footer";
import { BasePathProvider } from "@/frontend/shared/contexts/basepath-context";

// import { localFontFace } from "@/fonts/fonts";

// import localFont from "next/font/local";

// export const montserrat = localFont({
//   src: "../../fonts/Montserratarm-Regular.woff",
//   variable: "--montserrat-regular",
//   weight: "normal",
// });
// console.log("sdfghjk", montserrat.variable);

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <html lang="hy">
      <body>
        <BasePathProvider base="">
          <div>
            <ConfigBar />
            <Header />
            {children}
            <Footer />
          </div>
        </BasePathProvider>
      </body>
    </html>
  );
}
