import type { NextConfig } from "next";

const rewritesPaths = [
  ["/աստվածաշունչ", "/bible"],
  ["/հավատք", "/faith"],
  ["/վարք-սրբոց", "/sanctuary-attitude"],
  ["/գրքեր", "/books"],
  ["/հոդվածներ", "/articles"],
  ["/պոդքաստներ", "/podcasts"],
  //preview paths
  ["/site-preview/աստվածաշունչ", "/site-preview/bible"],
  ["/site-preview/հավատք", "/site-preview/fait"],
  ["/site-preview/վարք-սրբոց", "/site-preview/sanctuary-attitude"],
  ["/site-preview/գրքեր", "/site-preview/books"],
  ["/site-preview/հոդվածներ", "/site-preview/articles"],
  ["/site-preview/պոդքաստներ", "/site-preview/podcasts"],
];

const nextConfig: NextConfig = {
  output: "standalone",
  i18n: {
    locales: ["default"], // Use 'default' if not using multiple languages
    defaultLocale: "default", // Set the default language
  },
  /* config options here */
  async redirects() {
    return [
      {
        source: "/bible",
        destination: "/bible/echmiadzin",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ].concat(
      rewritesPaths.map(([source, destination]) => ({
        source: source
          .split("/")
          .map((chunk) => encodeURIComponent(chunk))
          .join("/"),
        destination,
        permanent: true,
      }))
    );
  },
  // async rewrites() {
  //   return rewritesPaths.map(([source, destination]) => ({
  //     source: source
  //       .split("/")
  //       .map((chunk) => encodeURIComponent(chunk))
  //       .join("/"),
  //     destination,
  //   }));
  // },
};

export default nextConfig;
