import { groupBy } from "@/utls/object-utils";
import { LANGUAGES } from "@/constants";
import {
  TestamentModel,
  BibleBookModel,
  BibleNavDataModel,
} from "../interfaces/site-pages.models";

const groupFn = (book: BibleBookModel) => {
  switch (book.translationName) {
    case "Էջմիածին" as string:
      return LANGUAGES.ECHMIADZIN;
    case "Արարատ" as string:
      return LANGUAGES.ARARAT;
    case "Գրաբար" as string:
      return LANGUAGES.GRABAR;
  }
  return "";
};
const normalizeTestamentBooks = (
  books: TestamentModel["books"]
): BibleBookModel[] => {
  return books.map((book) => {
    const slug = book.chapters[0].url.split("/").at(-2)!;
    return {
      id: book.id,
      title: book.title,
      translationName: book.translationName,
      slug,
      chapters: book.chapters,
    };
  });
};

export const createBibleNavDTO = (
  testament: TestamentModel[]
): BibleNavDataModel => {
  const newTestamentBooks = normalizeTestamentBooks(
    testament.find((item) => item.uniqueName === "newTestament")?.books || []
  );

  const oldTestamentBooks = normalizeTestamentBooks(
    testament.find((item) => item.uniqueName === "oldTestament")?.books || []
  );
  const newTestamentByLanguage = groupBy(newTestamentBooks, groupFn);
  const oldTestamentByLanguage = groupBy(oldTestamentBooks, groupFn);

  return {
    newTestament: newTestamentByLanguage,
    oldTestament: oldTestamentByLanguage,
  };
};
