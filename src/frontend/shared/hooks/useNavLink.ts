import { usePathname } from "next/navigation";
import { useBasePath } from "../contexts/basepath-context";
import { LinkProps } from "next/link";
import { isAbsolutePath } from "../utils/path-utils";
import { UrlObject } from "url";

const getFullUrl = (href: LinkProps["href"], basepath: string): UrlObject => {
  const isHrefObject = typeof href === "object";
  const hrefPathname = isHrefObject ? href.pathname : href;
  const isAbsolute = isAbsolutePath(hrefPathname);
  const fullUrl: UrlObject = {
    ...(isHrefObject && href),
    pathname: isAbsolute ? `${basepath}${hrefPathname}` : hrefPathname,
  };
  return fullUrl;
};

export function isActivePath(pathname: string, href: string, end?: boolean) {
  if (!pathname.trim() || !href.trim()) return false;
  const indexOf = pathname.indexOf(href);
  if (indexOf === -1) return false;
  const lastCharacter = pathname[indexOf + href.length] as undefined | "/";

  const isIncluded =
    pathname[indexOf - (isAbsolutePath(href) ? 0 : 1)] === "/" &&
    (lastCharacter === "/" || lastCharacter === undefined);

  if (isIncluded) {
    if (end && lastCharacter !== undefined) {
      return false;
    }
    return true;
  }
  return false;
}

export const useIsRouteMatches = (
  paths: LinkProps["href"][],
  end?: boolean
): boolean => {
  const pathname = usePathname();
  const basepath = useBasePath();

  return paths.some((href) => {
    const fullUrl = getFullUrl(href, basepath);
    return isActivePath(pathname, fullUrl.pathname ?? "", end);
  });
};

export const useNavLink = (href: LinkProps["href"], end?: boolean) => {
  const pathname = usePathname();
  const basepath = useBasePath();
  const fullUrl = getFullUrl(href, basepath);
  //   const isHrefObject = typeof href === "object";
  //   const hrefPathname = isHrefObject ? href.pathname : href;
  //   const isAbsolute = isAbsolutePath(hrefPathname);
  //   const fullUrl: UrlObject = {
  //     ...(isHrefObject && href),
  //     pathname: isAbsolute ? `${basepath}${hrefPathname}` : hrefPathname,
  //   };
  const isActive = isActivePath(pathname, fullUrl.pathname ?? "", end);
  return { url: fullUrl, isActive };
};
