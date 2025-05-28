"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/buttons/Button";
import parse from "html-react-parser";

export const WrongTextSenderDialog = () => {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.ctrlKey) {
        const selection = getSelection();
        if (selection?.rangeCount) {
          const range = selection.getRangeAt(0);
          const startContent = range.startContainer.textContent ?? "";
          const endContent = range.endContainer.textContent ?? "";
          const selectedText = range.toString();
          const startText =
            "..." +
            startContent.slice(
              Math.max(range.startOffset - 10, 0),
              range.startOffset
            );

          const endText =
            endContent.slice(range.endOffset, range.endOffset + 10) + "...";

          const fullText = `${startText}<span style='color:red'>${selectedText}</span>${endText}`;

          return setSelectedContent(fullText);
        }
      }
      if (e.key === "Escape") {
        return setSelectedContent(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!selectedContent) return null;
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-800/75 transition-opacity"
        aria-hidden="true"
        onClick={() => setSelectedContent(null)}
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"></div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    Հաղորդում կայքում սխալի վերաբերյալ
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {parse(selectedContent)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 gap-2 px-4 py-3 flex justify-end">
              <Button
                variant="outlined"
                onClick={() => setSelectedContent(null)}
              >
                Չեղարկել
              </Button>
              <Button variant="contained" isActive>
                Ուղարկել
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
