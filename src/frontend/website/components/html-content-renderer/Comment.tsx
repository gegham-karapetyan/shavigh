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
      const { left, right, x, width } =
        messageRef.current.getBoundingClientRect();
      //   console.log(
      //     "messageLeftPosition",
      //     messageRef.current.getBoundingClientRect()
      //   );
      console.log(
        messageRef.current.innerHTML,
        "left",
        left,
        "right",
        right,
        "x",
        x
      );
      if (left < 0) {
        messageRef.current.style.left = `${width / 2 + left}px`;

        return;
      }
      if (right > window.innerWidth) {
        messageRef.current.style.left = `${window.innerWidth - right - 16}px`;
      }
    }
  }, []);
  return (
    <span className="commentsPop">
      <span className="message" ref={messageRef}>
        {content}
      </span>
      {children}
    </span>
  );
};
