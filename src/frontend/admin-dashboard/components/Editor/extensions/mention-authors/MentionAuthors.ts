import { Mark, mergeAttributes } from "@tiptap/core";

export interface AuthorMentionOptions {
  HTMLAttributes?: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    authorMention: {
      setAuthorMention: (attributes: { author: string }) => ReturnType;
      toggleAuthorMention: (attributes: { author: string }) => ReturnType;
      unsetAuthorMention: () => ReturnType;
      unsetWholeAuthorMention: () => ReturnType; // <--- new command
    };
  }
}

export const MentionAuthor = Mark.create<AuthorMentionOptions>({
  name: "mentionAuthor",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      author: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-author"),
        renderHTML: (attributes) => {
          if (!attributes.author) return {};
          return { "data-author": attributes.author };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-author]" }];
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
      setAuthorMention:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },

      toggleAuthorMention:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },

      unsetAuthorMention:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },

      unsetWholeAuthorMention:
        () =>
        ({ state, commands }) => {
          const { from, to } = state.selection;
          let markFrom = from;
          let markTo = to;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (!node.isText) return;

            node.marks.forEach((mark) => {
              if (mark.type === state.schema.marks.mentionAuthor) {
                // Expand backwards
                let start = pos;
                while (start > 0) {
                  const char = state.doc.nodeAt(start - 1);
                  if (!char?.marks.some((m) => m.type === mark.type)) break;
                  start--;
                }
                // Expand forwards
                let end = pos + node.nodeSize;
                while (end < state.doc.content.size) {
                  const char = state.doc.nodeAt(end);
                  if (!char?.marks.some((m) => m.type === mark.type)) break;
                  end++;
                }
                markFrom = Math.min(markFrom, start);
                markTo = Math.max(markTo, end);
              }
            });
          });

          commands.setTextSelection({ from: markFrom, to: markTo });
          return commands.unsetMark(this.name);
        },
    };
  },
});
