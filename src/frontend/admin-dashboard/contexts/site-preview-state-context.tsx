import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { IPageData } from "./types";

export interface ISitePreviewStateContext {
  previewState: IPageData | null;
  setPreviewState: (state: IPageData | null) => void;
}

const SitePreviewState = createContext<ISitePreviewStateContext | null>(null);

export const SitePreviewStateProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [previewState, setPreviewState] = useState<IPageData | null>(null);
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
