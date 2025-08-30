"use client";
import { GetBibleDynamicPageModel } from "@/http-api/interfaces/site-pages.models";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type IBiblePageAuthorsContext = {
  parseAuthors: (contentSelector: string) => void;
  resetAuthors: () => void;
  authors: {
    label: string;
    onClick: () => void;
  }[];
};

const BiblePageAuthorsContext = createContext<IBiblePageAuthorsContext | null>(
  null
);

export const BiblePageAuthorsProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [authors, setAuthors] = useState<IBiblePageAuthorsContext["authors"]>(
    []
  );

  const parseAuthors: IBiblePageAuthorsContext["parseAuthors"] = useCallback(
    (contentSelector) => {
      const allAuthors = Array.from(
        document.querySelectorAll(`${contentSelector} span[data-author]`)
      ).map((node) => {
        return {
          label: node.getAttribute("data-author")!,
          onClick: () => {
            node.scrollIntoView({
              block: "center",
            });
          },
        };
      });
      setAuthors(allAuthors);
    },
    []
  );

  const resetAuthors = useCallback(() => {
    setAuthors([]);
  }, []);

  const value = useMemo<IBiblePageAuthorsContext>(
    () => ({
      authors,
      parseAuthors,
      resetAuthors,
    }),
    [authors, parseAuthors, resetAuthors]
  );

  return (
    <BiblePageAuthorsContext.Provider value={value}>
      {children}
    </BiblePageAuthorsContext.Provider>
  );
};
export const useBiblePageAuthors = () => {
  return useContext(BiblePageAuthorsContext)!;
};

export const ParseBiblePageAuthorsPlugin: FC<{
  contentSelector: string;
  data: GetBibleDynamicPageModel;
  isLoading?: boolean;
}> = ({ contentSelector, data, isLoading = false }) => {
  const { parseAuthors, resetAuthors } = useBiblePageAuthors();

  useEffect(() => {
    if (!data || isLoading) return resetAuthors();
    parseAuthors(contentSelector);
    return () => {
      resetAuthors();
    };
  }, [contentSelector, data, isLoading, parseAuthors, resetAuthors]);

  return null;
};
