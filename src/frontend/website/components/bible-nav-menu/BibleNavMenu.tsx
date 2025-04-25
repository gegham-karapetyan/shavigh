"use client";
import { FC, useState } from "react";
import { Button } from "../ui/buttons/Button";
import { NavLink } from "../ui/links/NavLink";
import { Expandable } from "../ui/Expandable";
import { IconButton } from "../ui/buttons/IconButton";
import { ToggleButton } from "./ToggleButton";

const data: BooksListProps = {
  newBibleBooks: [
    {
      bookName: "Հովհաննես",
      chapters: [
        { chapter: "Ներածություն", href: "/bible/new/hovhannes1" },
        { chapter: "2", href: "/bible/new/hovhannes2" },
        { chapter: "3", href: "/bible/new/hovhannes3" },
      ],
    },
    {
      bookName: "Հովհաննես 4",
      chapters: [
        { chapter: "Ներածություն", href: "/bible/new/hovhannes4" },
        ...Array.from({ length: 100 }, (_, i) => ({
          chapter: String(i + 1),
          href: "/bible/new/hovhannes5",
        })),
      ],
    },
    {
      bookName: "Հովհաննես 7",
      chapters: [
        { chapter: "Ներածություն", href: "/bible/new/hovhannes7" },
        { chapter: "8", href: "/bible/new/hovhannes8" },
        { chapter: "9", href: "/bible/new/hovhannes9" },
      ],
    },
  ],
  oldBibleBooks: [],
};

export const BibleNavMenu = () => {
  return (
    <div className="shadow-xl rounded-lg max-w-[450px]">
      <div className="flex px-7 py-2 flex-row gap-1 justify-between items-center border-b-[1px] border-gray-100">
        <Button variant="text" href="/" component={NavLink}>
          ԷՋՄԻԱԾԻՆ
        </Button>
        <Button variant="text" href="/" component={NavLink}>
          ԱՐԱՐԱՏ
        </Button>
        <Button variant="text" href="/" component={NavLink}>
          ԳՐԱԲԱՐ
        </Button>
      </div>
      <BooksList
        newBibleBooks={data.newBibleBooks}
        oldBibleBooks={data.oldBibleBooks}
      />
    </div>
  );
};

interface BooksListItemProps {
  bookName: string;
  chapters: {
    chapter: string;
    href: string;
  }[];
}

interface BooksListProps {
  newBibleBooks: BooksListItemProps[];
  oldBibleBooks: BooksListItemProps[];
}

const BooksList: FC<BooksListProps> = ({ newBibleBooks, oldBibleBooks }) => {
  const [open, setOpen] = useState({
    newBibleOpen: false,
    oldBibleOpen: false,
  });
  return (
    <ul className="divide-y divide-gray-100 select-none">
      <ToggleButton
        isActive={open.newBibleOpen}
        onToggle={() =>
          setOpen((p) => ({ ...p, newBibleOpen: !p.newBibleOpen }))
        }
        variant="book"
        title="ՆՈՐ ԿՏԱԿԱՐԱՆ"
      />

      <Expandable component="li" expanded={open.newBibleOpen}>
        {newBibleBooks.map((book) => (
          <BookWithChapters key={book.bookName} {...book} />
        ))}
      </Expandable>
      <ToggleButton
        isActive={open.oldBibleOpen}
        onToggle={() =>
          setOpen((p) => ({ ...p, oldBibleOpen: !p.oldBibleOpen }))
        }
        variant="book"
        title="ՀԻՆ ԿՏԱԿԱՐԱՆ"
      />

      <Expandable component="li" expanded={open.oldBibleOpen}>
        {oldBibleBooks.map((book) => (
          <BookWithChapters key={book.bookName} {...book} />
        ))}
      </Expandable>
    </ul>
  );
};

const BookWithChapters: FC<BooksListItemProps> = ({ bookName, chapters }) => {
  const [open, setOpen] = useState(false);
  return (
    <ul className="bg-gray-100">
      <ToggleButton
        title={bookName}
        variant="chapter"
        isActive={open}
        onToggle={() => setOpen(!open)}
      />

      <Expandable component="li" expanded={open}>
        <ul className="flex gap-1 px-8 flex-wrap p-3 bg-gray-500">
          {chapters.map((chapter, i) => (
            <li key={chapter.chapter} className="first-of-type:w-full">
              {i === 0 ? (
                <Button variant="text" href={chapter.href} component={NavLink}>
                  {chapter.chapter}
                </Button>
              ) : (
                <IconButton
                  variant="text"
                  href={chapter.href}
                  component={NavLink}
                >
                  {chapter.chapter}
                </IconButton>
              )}
            </li>
          ))}
        </ul>
      </Expandable>
    </ul>
  );
};
