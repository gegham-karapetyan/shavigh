"use client";
import dynamic from "next/dynamic";

export const DynamicEditor = dynamic(() => import("./RichTextEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
