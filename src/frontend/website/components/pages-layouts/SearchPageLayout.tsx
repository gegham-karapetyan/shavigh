"use client";

import { GetBibleDynamicPageModel } from "@/http-api/interfaces/site-pages.models";
import Link from "next/link";
import { useState } from "react";

const Skeleton = () => {
  return (
    <div role="status" className="max-w-5xl mx-auto animate-pulse">
      <div className="h-14 bg-gray-500 rounded w-full mb-4"></div>
      <div className="h-10 bg-gray-500 rounded w-full mb-4"></div>
      <div className="h-14 bg-gray-500 rounded w-full mb-4"></div>
      <div className="h-10 bg-gray-500 rounded w-full mb-4"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="max-w-5xl my-10 mx-auto text-red">
      <p>{message}</p>
    </div>
  );
};
const randomNumber = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const innerTextContent = (data: GetBibleDynamicPageModel) => {
  return data.content
    .replace(/<[^>]+>/g, "")
    .trim()
    .slice(0, randomNumber(80, 120));
};

export const SearchPageLayout = () => {
  const [data, setData] = useState<GetBibleDynamicPageModel[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const searchQuery = (event.target as HTMLFormElement).search.value;
    try {
      const response = await fetch(`/api/search?word=${searchQuery}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError("Տեղի է ունեցել սխալ, խնդրում ենք փորձել մի փոքր ուշ");
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 py-10">
      <form
        onSubmit={handleSubmit}
        className="flex items-center max-w-sm mx-auto"
      >
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="search"
            autoFocus
            className="border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary block w-full ps-10 p-2.5"
            placeholder="Փնտրել ..."
            required
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer p-2.5 ms-2 text-sm font-medium text-white bg-primary rounded-lg border border-primary  focus:ring-4 focus:outline-none focus:ring-primary/55"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Փնտրել</span>
        </button>
      </form>
      <div className="mt-10">
        {loading && <Skeleton />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && data?.length === 0 && (
          <div className="max-w-5xl mx-auto my-10 text-gray-500">
            <p>Փնտրած բառով ոչ մի արդյունք չի գտնվել</p>
          </div>
        )}
        {data?.map((item) => (
          <Link href={item.url} key={item.id} className="block mb-5">
            <div className="max-w-5xl mx-auto my-4 p-4 border border-gray-500 rounded-lg hover:bg-gray-100 transition-colors">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-gray-700">{innerTextContent(item)} ...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
