import PrevIcon from "@/frontend/website/media/icons/big-arrow-left.svg";
import NextIcon from "@/frontend/website/media/icons/big-arrow-right.svg";
import { IconButton } from "../ui/buttons/IconButton";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { Button } from "../ui/buttons/Button";

export interface BibleDynamicPageLayoutProps {
  contentSection?: Exclude<ReactNode, null | undefined>;
  prevLink?: string | null;
  nextLink?: string | null;
  title?: string;
}

export const BibleDynamicPageLayout: FC<BibleDynamicPageLayoutProps> = ({
  contentSection,
  prevLink,
  nextLink,
  title,
}) => {
  return (
    <div>
      {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
      {contentSection}

      <div className="flex gap-4 justify-center mt-6">
        {prevLink && (
          <IconButton
            size="lg"
            variant="text"
            component={Link}
            className="p-2"
            href={prevLink}
          >
            <PrevIcon className="max-w-full max-h-full" />
          </IconButton>
        )}
        {nextLink && (
          <IconButton
            size="lg"
            variant="text"
            className="p-2"
            component={Link}
            href={nextLink}
          >
            <NextIcon className="max-w-full max-h-full" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export interface BibleDynamicNotFoundPageProps {
  alternateUrl: string;
}

export const BibleDynamicNotFoundPage: FC<BibleDynamicNotFoundPageProps> = ({
  alternateUrl,
}) => {
  return (
    <div>
      Տվյալ նյութը հասանելի չէ այս թարգմանությամբ: Այն կարող եք դիտել
      <Button
        variant="text"
        className="font-default-bold"
        component={Link}
        href={alternateUrl}
      >
        Այստեղ.{" "}
      </Button>
    </div>
  );
};
