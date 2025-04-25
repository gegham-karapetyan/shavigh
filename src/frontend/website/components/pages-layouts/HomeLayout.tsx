import Image, { ImageProps } from "next/image";
import logo from "@/frontend/website/media/images/logo.svg";
import { FC, ReactNode } from "react";
import { HomeHero } from "../hero/HomeHero";
import { ArticleCard, ArticleCardProps } from "../ui/cards/ArticleCard";

// const logoProps = {
//   src: logo.src,
//   width: logo.width,
//   height: logo.height,
// };

interface HeroCardProps {
  src: ImageProps["src"];
  title: string;
  description: string;
}

const HeroCard: FC<HeroCardProps> = ({ description, src, title }) => {
  return (
    <div className="bg-white rounded-2xl shadow shadow-gray-400 w-full max-w-[320px] px-5 py-7">
      <Image src={src} alt="" className="m-auto min-h-14" />
      <h3 className="mt-5">{title}</h3>
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
        <div className="relative -mt-[130px] flex flex-col gap-4 justify-center items-center lg:flex-row text-center">
          <HeroCard
            src={logo}
            title="ԱՍՏՎԱԾԱՇՈՒՆՉ"
            description="Բացահայտել Աստծո Խոսքը՝ մեկնությունների միջոցով"
          />
          <HeroCard
            src={logo}
            title="ՀԱՎԱՏՔ"
            description="Ճանաչել Հայ Եկեղեցու սրբազան ավանդությունը"
          />
          <HeroCard
            src={logo}
            title="ՎԱՐՔ ՍՐԲՈՑ"
            description="Հետևել Եկեղեցու սրբերի օրինակին և ներշնչվել"
          />
        </div>
        <section className="scalable-section my-11 py-12 px-2">
          <div className="main-container">{welcomeContent}</div>
        </section>
        <section className="bg-gray-100 py-36 px-2">
          <div className="main-container flex flex-col items-center lg:items-stretch lg:flex-row  justify-between gap-7">
            {articles.map((article) => (
              <ArticleCard
                size="lg"
                className="bg-white shadow-2xl"
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
