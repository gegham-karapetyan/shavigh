import { FC, useMemo } from "react";
import arrow from "@/frontend/website/media/icons/arrow-down.svg";
import Image from "next/image";
import clsx from "clsx";

export interface ToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
  title: string;
  variant: "book" | "chapter";
}

const defaultStyles =
  "pl-12 flex flex-row gap-1 items-center justify-between cursor-pointer";

export const ToggleButton: FC<ToggleButtonProps> = ({
  isActive,
  onToggle,
  title,
  variant,
}) => {
  const variantStyles = useMemo(() => {
    return {
      book: clsx(
        "pr-7 py-7 text-black hover:text-primary/80 hover:underline",
        isActive && "text-primary"
      ),
      chapter: clsx(
        "py-1.5 pr-8 text-black transition hover:bg-primary/80 hover:text-white",
        isActive && "text-white bg-primary"
      ),
    };
  }, [isActive]);

  const TitleComponent = variant === "book" ? "h4" : "h5";
  return (
    <li
      role="button"
      tabIndex={0}
      onClick={onToggle}
      className={clsx(defaultStyles, variantStyles[variant])}
    >
      <TitleComponent className="font-bold">{title}</TitleComponent>
      <span>
        <Image
          src={arrow}
          className={clsx(
            "transition",
            isActive ? "rotate-180" : "rotate-0",
            variant === "book" ? "w-10" : "w-8"
          )}
          alt={isActive ? "close" : "open"}
        />
      </span>
    </li>
  );
};
