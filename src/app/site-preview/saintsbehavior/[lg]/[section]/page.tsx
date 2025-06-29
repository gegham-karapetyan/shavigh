"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAbsolutePath } from "@/frontend/shared/utils/path-utils";
import { useBasePath } from "@/frontend/shared/contexts/basepath-context";
import { useGetSaintsBehaviorSection } from "../../get-saints-behavior-data";

export default function Page() {
  const params = useParams() as { lg: string; section: string };
  const router = useRouter();
  const basePath = useBasePath();
  const pathname = usePathname();

  const { data } = useGetSaintsBehaviorSection(params.lg, params.section);
  let firstUrl: string | undefined;
  if (data) {
    const parsedContent = new DOMParser().parseFromString(
      data.content,
      "text/html"
    );
    firstUrl = parsedContent
      .querySelectorAll("a")[0]
      .getAttribute("href")
      ?.trim();
  }

  useEffect(() => {
    if (firstUrl) {
      router.replace(
        isAbsolutePath(firstUrl)
          ? `${basePath}${firstUrl}`
          : `${pathname}/${firstUrl}`
      );
    }
  }, [basePath, firstUrl, pathname, router]);

  if (!firstUrl) {
    return <div>error....</div>;
  }
  return null;
}
