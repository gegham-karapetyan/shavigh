"use client";
import { FC, useState } from "react";
import { NavLink } from "../ui/links/NavLink";
import { Expandable } from "../ui/Expandable";
import { ToggleButton } from "./ToggleButton";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export interface BibleNavMenuProps {
  newTestament: Record<string, BooksListItemProps[]>;
  oldTestament: Record<string, BooksListItemProps[]>;
  classname?: string;
}

const generatePathname = (language: string, pathname: string) => {
  const pathChunks = pathname.split("/");
  pathChunks[2] = language;
  return pathChunks.join("/");
};

export const BibleNavMenu: FC<BibleNavMenuProps> = ({
  newTestament,
  oldTestament,
  classname,
}) => {
  const pathname = usePathname();
  const lg = pathname.split("/")[2];
  const newTestamentByLanguage = newTestament[lg] || [];
  const oldTestamentByLanguage = oldTestament[lg] || [];

  return (
    <div
      className={clsx(
        "shadow-[0px_0px_20px_0px_rgba(0,_0,_0,_0.1)] rounded-3xl overflow-hidden",
        classname
      )}
    >
      <div className="flex px-2 lg:px-7 py-2 flex-row gap-1 justify-center items-center border-b-[1px] border-gray-100">
        <NavLink variant="text" href={generatePathname("echmiadzin", pathname)}>
          ԷՋՄԻԱԾԻՆ
        </NavLink>
        <NavLink variant="text" href={generatePathname("ararat", pathname)}>
          ԱՐԱՐԱՏ
        </NavLink>
        <NavLink variant="text" href={generatePathname("grabar", pathname)}>
          ԳՐԱԲԱՐ
        </NavLink>
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
  const testament = usePathname().split("/")[3];
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
  const book = usePathname().split("/")[4];
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
