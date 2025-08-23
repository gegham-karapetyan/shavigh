"use client";
import { FC, useEffect } from "react";

const useIdToAnchorScroller = (selector: string) => {
  useEffect(() => {
    const container = document.querySelector(selector);
    if (!container) return;
    const allAnchorsMap = Object.fromEntries(
      Array.from(document.querySelectorAll<HTMLElement>('a[href*="#"]')).map(
        (anchor) => {
          const id = anchor.getAttribute("href")?.split("#")[1];
          if (id) {
            return [id, anchor];
          }
          return [];
        }
      )
    ) as Record<string, HTMLAnchorElement>;

    const scrollToAnchor = (e: MouseEvent) => {
      const anchor = allAnchorsMap[(e.target as HTMLSpanElement).id];
      if (anchor) {
        anchor.scrollIntoView();
      }
    };
    const allAnchorIdsElements = Array.from(
      document.querySelectorAll<HTMLElement>("span[id]")
    ).filter((el) => el.id && allAnchorsMap[el.id]);

    allAnchorIdsElements.forEach((el) => {
      el.addEventListener("click", scrollToAnchor);
    });
    return () => {
      allAnchorIdsElements.forEach((el) => {
        el.removeEventListener("click", scrollToAnchor);
      });
    };
  }, [selector]);
};

export const IdToAnchorScrollerPlugin: FC<{ selector: string }> = ({
  selector,
}) => {
  useIdToAnchorScroller(selector);
  return null;
};
