"use client";
import { FC, useState } from "react";
import { NavLink } from "../ui/links/NavLink";
import { Expandable } from "../ui/Expandable";
import { ToggleButton } from "./ToggleButton";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/buttons/Button";
import { useBasePath } from "@/frontend/shared/contexts/basepath-context";

export interface BibleNavMenuProps {
  newTestament: Record<string, BooksListItemProps[]>;
  oldTestament: Record<string, BooksListItemProps[]>;
  classname?: string;
}

const generatePathname = (
  language: string,
  pathname: string,
  languageSegmentIndex: number
) => {
  const pathChunks = pathname.split("/");
  pathChunks[languageSegmentIndex] = language;
  return pathChunks.join("/");
};

export const BibleNavMenu: FC<BibleNavMenuProps> = ({
  newTestament,
  oldTestament,
  classname,
}) => {
  const pathname = usePathname();
  const basepath = useBasePath();
  const route = useRouter();

  const languageSegmentIndex = basepath ? 3 : 2;

  const [selectedLg, setSelectedLg] = useState(
    () => pathname.split("/")[languageSegmentIndex] || "echmiadzin"
  );

  const handleLanguageChange = (language: string) => {
    setSelectedLg(language);
    if (pathname.split("/")[languageSegmentIndex])
      route.push(generatePathname(language, pathname, languageSegmentIndex));
  };

  const newTestamentByLanguage = newTestament[selectedLg] || [];
  const oldTestamentByLanguage = oldTestament[selectedLg] || [];

  return (
    <div
      className={clsx(
        "shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.1)] rounded-3xl overflow-hidden select-none",
        classname
      )}
    >
      <div className="flex px-2 lg:px-7 py-2 flex-row gap-1 justify-center items-center border-b-[1px] border-gray-100">
        <Button
          isActive={selectedLg === "echmiadzin"}
          variant="text"
          onClick={() => handleLanguageChange("echmiadzin")}
        >
          ԷՋՄԻԱԾԻՆ
        </Button>
        <Button
          isActive={selectedLg === "ararat"}
          variant="text"
          onClick={() => handleLanguageChange("ararat")}
        >
          ԱՐԱՐԱՏ
        </Button>
        <Button
          isActive={selectedLg === "grabar"}
          variant="text"
          onClick={() => handleLanguageChange("grabar")}
        >
          ԳՐԱԲԱՐ
        </Button>
      </div>
      <BooksList
        newBibleBooks={newTestamentByLanguage}
        oldBibleBooks={oldTestamentByLanguage}
      />
    </div>
  );
};

export interface BooksListItemProps {
  slug: string;
  title: string;
  translationName: string;
  chapters: {
    title: string;
    url: string;
  }[];
}

export interface BooksListProps {
  newBibleBooks: BooksListItemProps[];
  oldBibleBooks: BooksListItemProps[];
}

const BooksList: FC<BooksListProps> = ({ newBibleBooks, oldBibleBooks }) => {
  const basepath = useBasePath();

  const testamentSegmentIndex = basepath ? 4 : 3;
  const testament = usePathname().split("/")[testamentSegmentIndex];
  const isNewTestament = testament === "newtestament";
  const isOldTestament = testament === "oldtestament";
  const [open, setOpen] = useState({
    newTestamentOpen: isNewTestament,
    oldTestamentOpen: isOldTestament,
  });
  return (
    <ul className="divide-y divide-gray-100 select-none">
      <ToggleButton
        isOpened={open.newTestamentOpen}
        isActive={isNewTestament}
        onToggle={() =>
          setOpen((p) => ({ ...p, newTestamentOpen: !p.newTestamentOpen }))
        }
        variant="book"
        title="ՆՈՐ ԿՏԱԿԱՐԱՆ"
      />

      <Expandable component="li" expanded={open.newTestamentOpen}>
        {newBibleBooks.map((book) => (
          <BookWithChapters key={book.slug} {...book} />
        ))}
      </Expandable>
      <ToggleButton
        isOpened={open.oldTestamentOpen}
        isActive={isOldTestament}
        onToggle={() =>
          setOpen((p) => ({ ...p, oldTestamentOpen: !p.oldTestamentOpen }))
        }
        variant="book"
        title="ՀԻՆ ԿՏԱԿԱՐԱՆ"
      />

      <Expandable component="li" expanded={open.oldTestamentOpen}>
        {oldBibleBooks.map((book) => (
          <BookWithChapters key={book.slug} {...book} />
        ))}
      </Expandable>
    </ul>
  );
};

const BookWithChapters: FC<BooksListItemProps> = ({
  slug,
  title,
  chapters,
}) => {
  const basepath = useBasePath();

  const bookSegmentIndex = basepath ? 5 : 4;
  const book = usePathname().split("/")[bookSegmentIndex];

  const isBookActive = book === slug;
  const [open, setOpen] = useState(isBookActive);
  return (
    <ul className="bg-gray-100">
      <ToggleButton
        title={title}
        variant="chapter"
        isActive={isBookActive}
        isOpened={open}
        onToggle={() => setOpen(!open)}
      />

      <Expandable component="li" expanded={open}>
        <ul className="flex gap-1 px-8 flex-wrap p-3 bg-gray-500">
          {chapters.map((chapter) => (
            <li key={chapter.title} className="first-of-type:w-full">
              <NavLink size="sm" href={`/${chapter.url}`}>
                {chapter.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </Expandable>
    </ul>
  );
};
