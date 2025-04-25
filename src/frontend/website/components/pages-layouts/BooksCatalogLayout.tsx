import { FC } from "react";
import { BookCard, BookCardProps } from "../ui/cards/BookCard";
import "./books-catalog-layout.css";

export interface BooksCatalogLayoutProps {
  books: BookCardProps["data"][];
}

export const BooksCatalogLayout: FC<BooksCatalogLayoutProps> = ({ books }) => {
  return (
    <main className="mt-16 lg:mt-[110px] px-5">
      <div className="main-container grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5">
        {books.map((book) => (
          <div className="book-grid-item" key={book.id}>
            <BookCard key={book.id} data={book} />
          </div>
        ))}
      </div>
    </main>
  );
};
