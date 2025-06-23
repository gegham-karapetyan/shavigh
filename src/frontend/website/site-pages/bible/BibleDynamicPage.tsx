import Link from "next/link";
import { HtmlContentRenderer } from "../../components/html-content-renderer";
import { IconButton } from "../../components/ui/buttons/IconButton";
import PrevIcon from "@/frontend/website/media/icons/big-arrow-left.svg";
import NextIcon from "@/frontend/website/media/icons/big-arrow-right.svg";
import { Button } from "../../components/ui/buttons/Button";
import { GetBibleDynamicPageModel } from "@/http-api/interfaces/site-pages.models";

// must be removed

export interface BibleDynamicPageProps {
  data?: GetBibleDynamicPageModel | null;
  alternateUrl: string;
}

export default function BibleDynamicPage(props: BibleDynamicPageProps) {
  if (!props.data) {
    return (
      <div>
        Տվյալ նյութը հասանելի չէ այս թարգմանությամբ: Այն կարող եք դիտել
        <Button
          variant="text"
          className="font-default-bold"
          component={Link}
          href={props.alternateUrl}
        >
          Այստեղ.{" "}
        </Button>
      </div>
    );
  }
  return (
    <div>
      <HtmlContentRenderer content={props.data.content} />
      <div className="flex gap-4 justify-center mt-6">
        {props.data.prevLink && (
          <IconButton
            size="lg"
            variant="text"
            component={Link}
            className="p-2"
            href={props.data.prevLink}
          >
            <PrevIcon className="max-w-full max-h-full" />
          </IconButton>
        )}
        {props.data.nextLink && (
          <IconButton
            size="lg"
            variant="text"
            className="p-2"
            component={Link}
            href={props.data.nextLink}
          >
            <NextIcon className="max-w-full max-h-full" />
          </IconButton>
        )}
      </div>
    </div>
  );
}
