"use client";
import { FC, ReactNode, useState } from "react";
import { FaithHero } from "../hero/FaithHero";
import { Button } from "../ui/buttons/Button";
// import { WrongTextIcon } from "../Footer/WrongTextIcon";
import icon1 from "@/frontend/website/media/icons/icon-01.svg";
import icon2 from "@/frontend/website/media/icons/icon-02.svg";
import icon3 from "@/frontend/website/media/icons/icon-03.svg";
import icon4 from "@/frontend/website/media/icons/icon-04.svg";
import icon5 from "@/frontend/website/media/icons/icon-05.svg";
import icon6 from "@/frontend/website/media/icons/icon-06.svg";

import {
  ArticlesSlider,
  ArticlesSliderProps,
} from "../articles-slider/ArticlesSlider";
import { ScrollTopButton } from "../ui/buttons/ScrollTopButton";
import clsx from "clsx";

type TextContents = {
  introContent: Exclude<ReactNode, null | undefined>;
} & Record<`${ButtonValueType}Content`, Exclude<ReactNode, null | undefined>>;

export interface FaithLayoutProps {
  textContents: TextContents;
  researchArticles: ArticlesSliderProps["slides"];
}

type ButtonValueType = (typeof buttons)[number]["value"];

const buttons = [
  {
    label: "ԴԱՎԱՆԱԿԱՆ",
    value: "religious",
    icon: icon1,
  },
  {
    label: "ՊԱՏՄԱԿԱՆ",
    value: "historical",
    icon: icon2,
  },
  {
    label: "ՀԱՎԱՏԱՄՔՆԵՐ",
    value: "beliefs",
    icon: icon3,
  },
  {
    label: "ԿԵՆՍԱԳՐՈՒԹՅՈՒՆԵՐ",
    value: "biographies",
    icon: icon4,
  },
  {
    label: "ՔԱՐՏԵԶՆԵՐ",
    value: "maps",
    icon: icon5,
  },
  {
    label: "ՀԱՐՑԱԶՐՈՒՅՑՆԵՐ",
    value: "podcasts",
    icon: icon6,
  },
] as const;

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

export const FaithLayout: FC<FaithLayoutProps> = ({
  textContents,
  researchArticles,
}) => {
  const [selectedButton, setSelectedButton] = useState<ButtonValueType>(
    buttons[0].value
  );

  const onButtonSelect = (value: ButtonValueType) => {
    setSelectedButton(value);
  };
  const selectedTextContent = textContents[`${selectedButton}Content`];
  return (
    <div>
      <main>
        <FaithHero />
        <section className="main-container scalable-section mt-11 py-12">
          {textContents.introContent}
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
                      buttonData.value === selectedButton && "fill-white"
                    )}
                  />
                }
                key={buttonData.value}
                variant="contained"
                className="group shadow-lg"
                onClick={() => onButtonSelect(buttonData.value)}
                isActive={buttonData.value === selectedButton}
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
          <div className="main-container">
            <SectionTitle title="ՈՒՍՈՒՄՆԱՍԻՐՈՒԹՅՈՒՆՆԵՐ" isDark />
            <ArticlesSlider className="mt-10" slides={researchArticles} />
          </div>
        </section>
        <section className="bg-white py-20">
          <div className="main-container">
            <SectionTitle title="ԹԱՐԳՄԱՆՈՒԹՅՈՒՆՆԵՐ" />
            <ArticlesSlider className="mt-10" slides={researchArticles} />
          </div>
        </section>
        <section className="bg-gray-100 py-20">
          <div className="main-container">
            <SectionTitle title="ԲՆԱԳՐԵՐ" isDark />
            <ArticlesSlider className="mt-10" slides={researchArticles} />
          </div>
        </section>
        <div className="text-center pt-10 px-2">
          <ScrollTopButton />
        </div>
      </main>
    </div>
  );
};
