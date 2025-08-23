"use client";
import {
  useFloating,
  offset,
  shift,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  flip,
} from "@floating-ui/react";
import { useState, type FC, Fragment, ComponentProps } from "react";

interface TooltipProps extends ComponentProps<"span"> {
  text: string;
}

export const Tooltip: FC<TooltipProps> = ({
  text,
  children,
  className,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      // arrow({ element: arrowRef, padding: 5 }),
      flip({
        fallbackAxisSideDirection: "none",
      }),
      shift(),
    ],
  });

  // Event listeners to change the open state
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <Fragment>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`cursor-help inline-block text-red whitespace-pre ${
          className || ""
        }`}
        {...rest}
      >
        {children}
      </span>
      <FloatingPortal>
        {isOpen && (
          <div
            className="z-50 px-2 py-1 text-xs text-gray-100 bg-gray-900 rounded shadow max-w-svw md:max-w-md"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {text}
          </div>
        )}
      </FloatingPortal>
    </Fragment>
  );
};
