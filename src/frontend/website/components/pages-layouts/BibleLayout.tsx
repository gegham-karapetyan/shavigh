import { FC, PropsWithChildren } from "react";
// import { BibleNavMenu } from "../bible-nav-menu/BibleNavMenu";
import { BibleHero } from "../hero/BibleHero";
import { BibleNavMenu } from "../bible-nav-menu/BibleNavMenu";
import { BibleNavDataModel } from "@/http-api/interfaces/site-pages.models";

export type BibleLayoutProps = PropsWithChildren<{
  data: BibleNavDataModel;
}>;
export const BibleLayout: FC<BibleLayoutProps> = ({ data, children }) => {
  return (
    <div>
      <BibleHero />
      <main className="main-container mt-16 lg:mt-[110px]">
        <div className="flex flex-col-reverse lg:flex-row gap-12 justify-between">
          <div>{children}</div>
          <div>
            <BibleNavMenu
              classname="lg:max-w-[450px]"
              newTestament={data.newTestament}
              oldTestament={data.oldTestament}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
