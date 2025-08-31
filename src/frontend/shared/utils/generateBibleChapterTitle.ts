export const generateBibleChapterTitle = (title: string) => {
  if (Number.isNaN(Number(title))) return title;
  return `Գլուխ ${title}`;
};
