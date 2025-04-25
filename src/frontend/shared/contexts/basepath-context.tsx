"use client";
import { createContext, FC, PropsWithChildren, useContext } from "react";

const BasePathContext = createContext<string>("");

export const BasePathProvider: FC<PropsWithChildren<{ base: string }>> = ({
  base,
  children,
}) => {
  return (
    <BasePathContext.Provider value={base}>{children}</BasePathContext.Provider>
  );
};
export const useBasePath = () => {
  return useContext(BasePathContext);
};
