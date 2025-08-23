import { Mark, mergeAttributes } from "@tiptap/core";

export interface TooltipMarkOptions {
  HTMLAttributes?: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    tooltip: {
      /**
       * Set a tooltip mark
       */
      setTooltip: (attributes: { info: string }) => ReturnType;
      /**
       * Toggle a tooltip mark
       */
      toggleTooltip: (attributes: { info: string }) => ReturnType;
      /**
       * Unset a tooltip mark
       */
      unsetTooltip: () => ReturnType;
    };
  }
}

export const Tooltip = Mark.create<TooltipMarkOptions>({
  name: "tooltip",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      info: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-info"),
        renderHTML: (attributes) => {
          if (!attributes.info) {
            return {};
          }
          return {
            "data-info": attributes.info,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-info]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes || {}, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setTooltip:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleTooltip:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetTooltip:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
