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
        | ((searchParams: URLSearchParams) => URLSearchParams)
    ) => {
      if (typeof queryParams === "function") {
        const params = queryParams(
          new URLSearchParams(searchParamsRef.current)
        );
        const stringifiedParams = params.toString().trim();
        if (stringifiedParams) {
          router.push(pathname + "?" + stringifiedParams);
        } else {
          router.push(pathname);
        }
      } else {
        const stringifiedParams = queryParams.toString().trim();
        if (stringifiedParams) {
          router.push(pathname + "?" + stringifiedParams);
        } else {
          router.push(pathname);
        }
      }
    },
    [router, pathname]
  );
  return [searchParams, setSearchParams] as const;
};
