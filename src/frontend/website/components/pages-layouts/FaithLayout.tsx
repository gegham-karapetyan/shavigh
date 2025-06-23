"use client";
import { FC, Fragment, ReactNode, SVGProps, useState } from "react";
import { FaithHero } from "../hero/FaithHero";
import { Button } from "../ui/buttons/Button";
// import { WrongTextIcon } from "../Footer/WrongTextIcon";
import icon1 from "@/frontend/website/media/icons/icon-01.svg";
import icon2 from "@/frontend/website/media/icons/icon-02.svg";
import icon3 from "@/frontend/website/media/icons/icon-03.svg";
import icon4 from "@/frontend/website/media/icons/icon-04.svg";
import icon5 from "@/frontend/website/media/icons/icon-05.svg";
import icon6 from "@/frontend/website/media/icons/icon-06.svg";

import { ArticlesSlider } from "../articles-slider/ArticlesSlider";
import { ScrollTopButton } from "../ui/buttons/ScrollTopButton";
import clsx from "clsx";
import {
  GetArticleListItemModel,
  GetFaithPageModel,
} from "@/http-api/interfaces/site-pages.models";
// import { GetFaithPageModel } from "@/interfaces/static-pages.mode";
// import { GetArticleListItemModel } from "@/interfaces/articles.model";

type ITextContentSections = Record<
  keyof Omit<
    GetFaithPageModel["content"],
    "researchArticles" | "translationsArticles" | "bibliographiesArticles"
  >,
  NonNullable<ReactNode>
>;

export type FaithLayoutProps = ITextContentSections & {
  bibliographiesArticlesSection: NonNullable<ReactNode>;
  researchArticlesSection: NonNullable<ReactNode>;
  translationsArticlesSection: NonNullable<ReactNode>;
};

type ISelectButton = {
  label: string;
  value: string;
  matchedContent: keyof ITextContentSections;
  icon: FC<SVGProps<SVGElement>>;
};
const buttons: ISelectButton[] = [
  {
    label: "ԴԱՎԱՆԱԿԱՆ",
    value: "religious",
    matchedContent: "religiousContent",
    icon: icon1,
  },
  {
    label: "ՊԱՏՄԱԿԱՆ",
    value: "historical",
    matchedContent: "historicalContent",
    icon: icon2,
  },
  {
    label: "ՀԱՎԱՏԱՄՔՆԵՐ",
    value: "beliefs",
    matchedContent: "beliefsContent",
    icon: icon3,
  },
  {
    label: "ԿԵՆՍԱԳՐՈՒԹՅՈՒՆԵՐ",
    value: "biographies",
    matchedContent: "biographiesContent",
    icon: icon4,
  },
  {
    label: "ՔԱՐՏԵԶՆԵՐ",
    value: "maps",
    matchedContent: "mapsContent",
    icon: icon5,
  },
  {
    label: "ՀԱՐՑԱԶՐՈՒՅՑՆԵՐ",
    value: "podcasts",
    matchedContent: "podcastsContent",
    icon: icon6,
  },
];

const SectionTitle: FC<{ title: string; isDark?: boolean }> = ({
  title,
  isDark,
}) => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="w-full h-[1px] bg-gray-800 absolute left-0 to-50%" />
      <h2
        className={clsx(
          "text-xl md:text-2xl px-5 z-[1] font-default-bold",
          isDark ? " bg-gray-100" : "bg-white"
        )}
      >
        {title}
      </h2>
    </div>
  );
};

const ArticlesSection: FC<{
  articles: GetArticleListItemModel[];
  isDark: boolean;
  title: string;
}> = ({ articles, isDark, title }) => {
  return (
    <Fragment>
      <SectionTitle title={title} isDark={isDark} />
      <ArticlesSlider className="mt-10" slides={articles} />
    </Fragment>
  );
};

export const ResearchArticlesSection: FC<{
  articles: GetArticleListItemModel[];
}> = ({ articles }) => {
  return (
    <ArticlesSection isDark articles={articles} title="ՈՒՍՈՒՄՆԱՍԻՐՈՒԹՅՈՒՆՆԵՐ" />
  );
};
export const TranslationsArticlesSection: FC<{
  articles: GetArticleListItemModel[];
}> = ({ articles }) => {
  return (
    <ArticlesSection
      isDark={false}
      articles={articles}
      title="ԹԱՐԳՄԱՆՈՒԹՅՈՒՆՆԵՐ"
    />
  );
};
export const BibliographiesArticlesSection: FC<{
  articles: GetArticleListItemModel[];
}> = ({ articles }) => {
  return <ArticlesSection isDark articles={articles} title="ԲՆԱԳՐԵՐ" />;
};

export const FaithLayout: FC<FaithLayoutProps> = (props) => {
  const [selectedButton, setSelectedButton] = useState(buttons[0]);

  const selectedTextContent = props[
    selectedButton.matchedContent
  ] as NonNullable<ReactNode>;

  return (
    <div>
      <main>
        <FaithHero />
        <section className="main-container scalable-section mt-11 py-12">
          {props.introductionContent}
        </section>
        <section className="bg-gray-100 py-20">
          <div className="main-container grid gap-x-6 gap-y-5 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            {buttons.map((buttonData) => (
              <Button
                size="xl"
                startAdornment={
                  <buttonData.icon
                    className={clsx(
                      "fill-primary group-hover:fill-white w-8 h-auto",
                      buttonData.value === selectedButton.value && "fill-white"
                    )}
                  />
                }
                key={buttonData.value}
                variant="contained"
                className="group shadow-lg"
                onClick={() => setSelectedButton(buttonData)}
                isActive={buttonData.value === selectedButton.value}
              >
                {buttonData.label}
              </Button>
            ))}
          </div>
        </section>
        <section className="small-container scalable-section mt-20 ">
          {selectedTextContent}
        </section>
        <section className="bg-gray-100 mt-20 py-20">
          <div className="main-container">{props.researchArticlesSection}</div>
        </section>
        <section className="bg-white py-20">
          <div className="main-container">
            {props.translationsArticlesSection}
          </div>
        </section>
        <section className="bg-gray-100 py-20">
          <div className="main-container">
            {props.bibliographiesArticlesSection}
          </div>
        </section>
        <div className="text-center pt-10 px-2">
          <ScrollTopButton />
        </div>
      </main>
    </div>
  );
};
