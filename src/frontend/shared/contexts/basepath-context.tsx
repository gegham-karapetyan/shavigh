"use client";
import { SITE_PREVIEW_BASEPATH } from "@/constants";
import { createContext, FC, PropsWithChildren, useContext } from "react";

const BasePathContext = createContext<"" | typeof SITE_PREVIEW_BASEPATH>("");

export const BasePathProvider: FC<
  PropsWithChildren<{ base: "" | typeof SITE_PREVIEW_BASEPATH }>
> = ({ base, children }) => {
  return (
    <BasePathContext.Provider value={base}>{children}</BasePathContext.Provider>
  );
};
export const useBasePath = () => {
  return useContext(BasePathContext);
};
