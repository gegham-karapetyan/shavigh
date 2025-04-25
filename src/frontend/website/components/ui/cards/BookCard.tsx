import { FC } from "react";
import Link from "next/link";
import clsx from "clsx";

export interface IBookCardData {
  id: number;
  title: string;
  description?: string;
  // imageUrl: string,
  bookUrl: string;
  author: string;
  imgSrc: string;
  date?: string;
  // tags: string[]
}

export interface BookCardProps {
  data: IBookCardData;
  className?: string;
  size?: "lg" | "md";
}

const cardSizes = {
  lg: "max-w-[300px] min-h-[400px]",
  md: "max-w-[230px] min-h-[400px]",
};

export const BookCard: FC<BookCardProps> = ({
  data,
  className,
  size = "md",
}) => {
  return (
    <Link
      href={data.bookUrl}
      className={clsx(
        "bg-white p-1 flex flex-col hover:shadow-md transition",
        cardSizes[size],
        className
      )}
    >
      <div className="grow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="block w-full h-full object-contain"
          src={data.imgSrc}
          alt={data.title}
        />
      </div>
      <h3 className="font-bold mt-3 hover:text-primary transition">
        {data.title}
      </h3>
      <p className="mt-4">{data.author}</p>
    </Link>
  );
};
