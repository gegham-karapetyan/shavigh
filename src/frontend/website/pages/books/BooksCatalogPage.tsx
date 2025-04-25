import { FC } from "react";
import {
  BooksCatalogLayout,
  BooksCatalogLayoutProps,
} from "../../components/pages-layouts/BooksCatalogLayout";

export interface BooksCatalogPageProps {
  books: BooksCatalogLayoutProps["books"][];
}

export const BooksCatalogPage: FC<BooksCatalogLayoutProps> = ({ books }) => {
  return <BooksCatalogLayout books={books} />;
};
