"use client";

// import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
// import { HomeLayout } from "@/frontend/website/components/pages-layouts/HomeLayout";
// import { useQuery } from "@tanstack/react-query";

// import { useRouter } from "next/navigation";

// const useGetHomePageData = () => {
//   return useQuery({
//     queryKey: ["homepage"],
//     queryFn: async () => {
//       const response = await fetch("/api/pages/home");
//       return await response.json();
//     },
//   });
// };

export function HomePageEditable() {
  return "home page editable";
  // return (
  //   <HomeLayout welcomeContent={<HtmlContentRenderer content={"editable"} />} />
  // );
}
