export const isInternalAbsoluteUrl = (url: string) => {
  return url.startsWith("/") && !url.startsWith("//");
};
