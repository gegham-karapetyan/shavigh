"use client";
import { useCallback, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const setSearchParams = useCallback(
    (
      queryParams:
        | URLSearchParams
        | ((searchParams: URLSearchParams) => URLSearchParams),
      replace: boolean = false
    ) => {
      const method = replace ? "replace" : "push";
      if (typeof queryParams === "function") {
        const params = queryParams(
          new URLSearchParams(searchParamsRef.current)
        );
        const stringifiedParams = params.toString().trim();
        if (stringifiedParams) {
          router[method](pathname + "?" + stringifiedParams);
        } else {
          router[method](pathname);
        }
      } else {
        const stringifiedParams = queryParams.toString().trim();
        if (stringifiedParams) {
          router[method](pathname + "?" + stringifiedParams);
        } else {
          router[method](pathname);
        }
      }
    },
    [router, pathname]
  );
  return [searchParams, setSearchParams] as const;
};
