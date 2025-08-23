import { Mark, mergeAttributes } from "@tiptap/core";

export interface AnchorIdMarkOptions {
  HTMLAttributes?: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    anchorId: {
      setAnchorId: (attributes: { id: string }) => ReturnType;
      toggleAnchorId: (attributes: { id: string }) => ReturnType;
      unsetAnchorId: () => ReturnType;
    };
  }
}

export const AnchorId = Mark.create<AnchorIdMarkOptions>({
  name: "anchorId",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("id"),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return {
            id: attributes.id,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[id]",
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
      setAnchorId:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleAnchorId:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetAnchorId:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
