import { FC } from "react";
// import { BibleNavMenu } from "../bible-nav-menu/BibleNavMenu";
import { BibleHero } from "../hero/BibleHero";
import { HtmlContentRenderer } from "../html-content-renderer";

export interface BibleLayoutProps {
  bodyContent: string;
}
export const BibleLayout: FC<BibleLayoutProps> = ({ bodyContent }) => {
  return (
    <div>
      <main>
        <BibleHero />
        <div className="flex gap-6">
          <HtmlContentRenderer content={bodyContent} />
          {/* <BibleNavMenu /> */}
        </div>
      </main>
    </div>
  );
};
