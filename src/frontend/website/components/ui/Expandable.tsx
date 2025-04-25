import clsx from "clsx";
import { FC, ReactNode } from "react";

export interface ExpandableProps {
  children: ReactNode | ReactNode[];
  expanded?: boolean;
  component?: React.ElementType;
}

export const Expandable: FC<ExpandableProps> = ({
  children,
  expanded = false,
  component,
}) => {
  const Component = component || "div";
  return (
    <Component
      className={clsx(
        "grid transition-all",
        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </Component>
  );
};
