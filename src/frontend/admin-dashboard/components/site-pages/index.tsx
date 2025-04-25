"use client";

import {
  useParams,
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
  useSearchParams,
} from "next/navigation";
import { HomePageEditable } from "./home/HomePage";

export const EditableSiteView = () => {
  console.log({
    params: useParams(),
    pathname: usePathname(),
    selectedLayoutSegment: useSelectedLayoutSegment(),
    selectedLayoutSegments: useSelectedLayoutSegments(),
    searchParams: useSearchParams(),
  });

  return <HomePageEditable />;
};
