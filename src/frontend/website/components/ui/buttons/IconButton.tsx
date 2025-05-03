import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType } from "react";
import { Sizes, Variant } from "../types";

export type IconButtonProps<T extends ElementType = "button"> = {
  size?: Sizes;
  variant?: Variant;
  className?: string;
  component?: T;
} & ComponentPropsWithoutRef<T>;

const sizes: Record<Sizes, string> = {
  xs: "w-4 h-4 text-sm",
  sm: "w-6 h-6 text-sm",
  md: "w-8 h-8 text-lg",
  lg: "w-10 h-10 text-xl",
  xl: "w-14 h-14 text-4xl",
  "3xl": "w-24 h-24 text-7xl",
};
const variants: Record<Variant, string> = {
  outlined: "text-white bg-transparent border-[1px] border-primary",
  contained: "text-white bg-primary hover:bg-primary/40",
  text: "text-black bg-transparent hover:bg-primary/10",
  mixed: "text-black bg-transparent hover:bg-primary/10",
};

export const IconButton = <T extends ElementType = "button">({
  children,
  className,
  component,
  size = "md",
  variant = "contained",
  ...rest
}: IconButtonProps<T>) => {
  const Component = component || "button";
  return (
    <Component
      className={clsx(
        "cursor-pointer p-1 focus:outline-none font-medium rounded-full  text-center inline-flex justify-center items-center",
        sizes[size],
        variants[variant],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
