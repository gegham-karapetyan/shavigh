export const isInternalAbsoluteUrl = (url: string) => {
  return url.startsWith("/") && !url.startsWith("//");
};

export const getLastPathSegment = (href?: string | null) => {
  if (!href) return null;
  const pathname = href.replace(/[?#].*/, "");

  const segments = pathname.split("/").filter(Boolean);
  return segments.length > 0 ? segments[segments.length - 1] : null;
};
