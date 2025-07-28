import { FC } from "react";
import { Button } from "../buttons/Button";
import Link from "next/link";
import clsx from "clsx";
import { GetArticleListItemModel } from "@/http-api/interfaces/site-pages.models";

export interface IArticleCardData {
  id: number;
  title: string;
  description: string;
  // imageUrl: string,
  articleUrl: string;
  // authorName: string,
  //   authorUrl: string;
  date: string;
  // tags: string[]
}

export interface ArticleCardProps {
  data: GetArticleListItemModel;
  className?: string;
  size?: "lg" | "md";
}

const articleSizes = {
  lg: "px-6 pt-16 pb-12",
  md: "px-2 py-4",
};

export const ArticleCard: FC<ArticleCardProps> = ({
  data,
  className,
  size = "md",
}) => {
  return (
    <div className={clsx("min-w-2xs", articleSizes[size], className)}>
      <p>{new Date(data.createdAt).toLocaleDateString()}</p>
      <h2 className="font-bold mt-3">{data.title}</h2>
      <p className="mt-5">{data.description}</p>
      <div className="mt-5">
        <Button variant="outlined" href={data.url} component={Link}>
          Read more
        </Button>
      </div>
    </div>
  );
};
