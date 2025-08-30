export const isAbsolutePath = (path?: string | null) => {
  if (!path) return false;
  return path[0] === "/" && path[1] !== "/";
};

export const isExternalPath = (path?: string | null) => {
  if (!path) return false;
  return path.startsWith("http") || path.startsWith("//");
};
