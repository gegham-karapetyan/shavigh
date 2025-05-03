import { groupBy } from "@/frontend/shared/utils/object-utils";
import {
  BibleNavMenu,
  BooksListItemProps,
} from "@/frontend/website/components/bible-nav-menu/BibleNavMenu";
import { BibleHero } from "@/frontend/website/components/hero/BibleHero";
import { PropsWithChildren } from "react";

import tmpJson from "./tmp.json";

interface IBook {
  title: string;
  translationName: string;
  chapters: {
    url: string;
    title: string;
  }[];
}

interface ITestament {
  name: string;
  uniqueName: string;
  books: IBook[];
}

const normalizeTestamentBooks = (
  books: ITestament["books"]
): BooksListItemProps[] => {
  return books.map((book) => {
    const slug = book.chapters[0].url.split("/").at(-2)!;
    return {
      title: book.title,
      translationName: book.translationName,
      slug,
      chapters: book.chapters,
    };
  });
};
export default async function BibleLayout(props: PropsWithChildren) {
  // const data = await fetch("http://192.168.2.179:8080/bibles");
  // const testament = (await data.json()) as ITestament[];

  const testament = tmpJson as ITestament[];

  const groupFn = (book: BooksListItemProps) => {
    switch (book.translationName) {
      case "Էջմիածին" as string:
        return "echmiadzin";
      case "Արարատ" as string:
        return "ararat";
      case "Գրաբար" as string:
        return "grabar";
    }
    return "";
  };

  const newTestamentBooks = normalizeTestamentBooks(
    testament.find((item) => item.uniqueName === "newTestament")?.books || []
  );

  const oldTestamentBooks = normalizeTestamentBooks(
    testament.find((item) => item.uniqueName === "oldTestament")?.books || []
  );
  const newTestamentByLanguage = groupBy(newTestamentBooks, groupFn);
  const oldTestamentByLanguage = groupBy(oldTestamentBooks, groupFn);

  return (
    <div>
      <BibleHero />
      <main className="mt-16 lg:mt-[110px] px-5">
        <div className="main-container flex flex-col-reverse lg:flex-row gap-12 justify-between">
          <div>{props.children}</div>
          <div>
            <BibleNavMenu
              classname="lg:max-w-[450px]"
              newTestament={newTestamentByLanguage}
              oldTestament={oldTestamentByLanguage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
