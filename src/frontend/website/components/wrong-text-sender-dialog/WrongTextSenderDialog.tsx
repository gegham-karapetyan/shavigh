"use client";

import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { CreateInboxMessageModel } from "@/http-api/interfaces/inbox.models";

export const WrongTextSenderDialog = () => {
  const [selectedContent, setSelectedContent] = useState<{
    text: string;
    html: string;
  } | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const sendInboxMessage = async () => {
    try {
      const response = await fetch("/api/inbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: selectedContent!.html,
          url: window.location.href,
        } as CreateInboxMessageModel),
      });
      if (response.ok) {
        setInfo("Հաղորդումը հաջողությամբ ուղարկվեց");
      } else {
        throw new Error("error");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setInfo("Տեղի է ունեցել սխալ, խնդրում ենք փորձել մի փոքր ուշ");
    }
  };

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

          const fullHtml = `${startText}<span style='color:red'>${selectedText}</span>${endText}`;

          return setSelectedContent({
            text: selectedText,
            html: fullHtml,
          });
        }
      }
      if (e.key === "Escape") {
        return setSelectedContent(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const closeDialog = () => {
    setSelectedContent(null);
    setInfo(null);
  };

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
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    Հաղորդում կայքում սխալի վերաբերյալ
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {info ?? parse(selectedContent.html)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 gap-2 px-4 py-3 flex justify-end">
              <button
                onClick={closeDialog}
                type="button"
                className="cursor-pointer text-primary hover:text-primary/80 border border-primary hover:border-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {info ? "Փակել" : "Չեղարկել"}
              </button>

              {!info && (
                <button
                  onClick={sendInboxMessage}
                  type="button"
                  className="cursor-pointer focus:outline-none text-white bg-primary hover:bg-primary/70 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Ուղարկել
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
