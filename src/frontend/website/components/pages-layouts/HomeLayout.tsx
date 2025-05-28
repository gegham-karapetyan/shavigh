import icon1 from "@/frontend/website/media/icons/icon-08.svg";
import icon2 from "@/frontend/website/media/icons/icon-02.svg";
import icon3 from "@/frontend/website/media/icons/icon-07.svg";

import { HomeHero } from "../hero/HomeHero";
import { ArticleCard, ArticleCardProps } from "../ui/cards/ArticleCard";
import { FC, ReactNode, SVGProps } from "react";

// const logoProps = {
//   src: logo.src,
//   width: logo.width,
//   height: logo.height,
// };

interface HeroCardProps {
  title: string;
  description: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

const HeroCard: FC<HeroCardProps> = ({ description, title, icon: Icon }) => {
  return (
    <div className="bg-white rounded-3xl shadow shadow-gray-400 w-full max-w-[300px] px-5 py-7">
      <Icon className="fill-primary m-auto min-h-14 max-w-12" />
      <h3 className="mt-1">{title}</h3>
      <p className="mt-3.5">{description}</p>
    </div>
  );
};

export interface HomeLayoutProps {
  welcomeContent: Exclude<ReactNode, null | undefined>;
  articles: ArticleCardProps["data"][];
}
export const HomeLayout: FC<HomeLayoutProps> = ({
  welcomeContent,
  articles,
}) => {
  return (
    <div>
      <main>
        <HomeHero />
        <div className="relative -mt-[120px] flex flex-col gap-6 justify-center items-center lg:flex-row text-center">
          <HeroCard
            icon={icon1}
            title="ԱՍՏՎԱԾԱՇՈՒՆՉ"
            description="Բացահայտել Աստծո Խոսքը՝ մեկնությունների միջոցով"
          />
          <HeroCard
            icon={icon2}
            title="ՀԱՎԱՏՔ"
            description="Ճանաչել Հայ Եկեղեցու սրբազան ավանդությունը"
          />
          <HeroCard
            icon={icon3}
            title="ՎԱՐՔ ՍՐԲՈՑ"
            description="Հետևել Եկեղեցու սրբերի օրինակին և ներշնչվել"
          />
        </div>
        <section className="main-container scalable-section my-11 py-12">
          {welcomeContent}
        </section>
        <section className="bg-gray-100 py-36">
          <div className="main-container flex flex-col items-center lg:items-stretch lg:flex-row  justify-between gap-7">
            {articles.map((article) => (
              <ArticleCard
                size="lg"
                className="bg-white shadow-2xl rounded-2xl"
                key={article.id}
                data={article}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
