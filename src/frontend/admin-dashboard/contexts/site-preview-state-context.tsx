import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { EntitySelector, PageType, RouteDataModel } from "./types";

export interface ISitePreviewStateContext {
  previewState: RouteDataModel | null;
  setPreviewState: (state: RouteDataModel | null) => void;
}
export const getEntitySelector = (
  pageType: PageType,
  id: number
): EntitySelector => `${pageType}:${id}`;

const SitePreviewState = createContext<ISitePreviewStateContext | null>(null);

export const SitePreviewStateProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [previewState, setPreviewState] = useState<RouteDataModel | null>(null);
  return (
    <SitePreviewState.Provider value={{ previewState, setPreviewState }}>
      {children}
    </SitePreviewState.Provider>
  );
};

export const useSitePreviewState = () => {
  const context = useContext(SitePreviewState);
  if (!context) {
    throw new Error(
      "useSitePreviewState must be used within a SitePreviewStateProvider"
    );
  }
  return context;
};
