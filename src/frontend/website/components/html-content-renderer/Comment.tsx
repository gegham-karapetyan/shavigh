"use client";
import useLayoutEffectImpl from "@/frontend/shared/utils/useLayoutEffect";
import { FC, PropsWithChildren, useRef } from "react";

export interface CommentProps {
  content: string;
}
export const Comment: FC<PropsWithChildren<CommentProps>> = ({
  children,
  content,
}) => {
  const messageRef = useRef<HTMLSpanElement>(null);
  useLayoutEffectImpl(() => {
    if (messageRef.current) {
      const rect = messageRef.current.getBoundingClientRect();

      if (rect.right - rect.width / 2 >= window.innerWidth) {
        messageRef.current.style.transform = `translateX(-${Math.abs(
          window.innerWidth - rect.right - 16
        )}px)`;
      } else if (rect.left - rect.width / 2 <= 0) {
        messageRef.current.style.transform = `translateX(-${Math.abs(
          rect.left - 16
        )}px)`;
      } else {
        messageRef.current.style.transform = `translateX(-${Math.abs(
          rect.width / 2
        )}px)`;
      }
    }
  }, []);
  return (
    <span
      className="commentsPop"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <span className="message" ref={messageRef}>
        {content}
      </span>
      {children}
    </span>
  );
};
