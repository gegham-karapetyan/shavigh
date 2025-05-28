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
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: { test?: RegExp }) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
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
