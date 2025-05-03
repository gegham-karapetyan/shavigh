import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useMemo,
} from "react";
import clsx from "clsx";

export type ButtonProps<T extends ElementType = "button"> = {
  component?: T;
  className?: string;
  variant?: "contained" | "outlined" | "text" | "mixed";
  size?: keyof typeof sizeStyles;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  isActive?: boolean;
} & ComponentPropsWithoutRef<T>;

const baseStyles =
  "inline-flex items-center transition-colors duration-300 focus:outline-none  cursor-pointer";
const sizeStyles = {
  sm: "px-2 py-1 rounded-lg text-sm",
  md: "px-4 py-2 rounded-lg text-base",
  lg: "px-6 py-6 rounded-xl text-xl",
  xl: "px-8 py-8 rounded-2xl text-xl",
};

export const Button = <T extends ElementType = "button">({
  component,
  className,
  children,
  variant = "contained",
  size = "md",
  startAdornment,
  endAdornment,
  isActive,
  ...props
}: ButtonProps<T>) => {
  const Component = component || "button";

  const variantStyles = useMemo(
    () => ({
      contained: clsx(
        "hover:bg-primary/90",
        isActive ? "bg-primary text-white  font-default-bold" : "bg-white"
      ),
      outlined: clsx(
        "border border-primary text-primary hover:bg-primary hover:text-white",
        isActive && "bg-primary text-white font-default-bold"
      ),
      text: clsx(
        "text-black hover:text-primary hover:underline",
        isActive && "text-primary font-default-bold"
      ),
      mixed: clsx(
        "text-black",
        isActive
          ? "text-white bg-primary hover:bg-primary/90"
          : "hover:text-primary hover:underline"
      ),
    }),
    [isActive]
  );
  return (
    <Component
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {startAdornment && <span className="mr-3">{startAdornment}</span>}
      {children}
      {endAdornment && <span className="ml-3">{endAdornment}</span>}
    </Component>
  );
};
