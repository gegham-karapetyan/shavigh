"use client";
import { FC, ReactNode, useState } from "react";
import { FaithHero } from "../hero/FaithHero";
import { Button } from "../ui/buttons/Button";
import { WrongTextIcon } from "../Footer/WrongTextIcon";
import {
  ArticlesSlider,
  ArticlesSliderProps,
} from "../articles-slider/ArticlesSlider";
import { ScrollTopButton } from "../ui/buttons/ScrollTopButton";

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
    icon: WrongTextIcon,
  },
  {
    label: "ՊԱՏՄԱԿԱՆ",
    value: "historical",
    icon: WrongTextIcon,
  },
  {
    label: "ՀԱՎԱՏԱՄՔՆԵՐ",
    value: "beliefs",
    icon: WrongTextIcon,
  },
  {
    label: "ԿԵՆՍԱԳՐՈՒԹՅՈՒՆԵՐ",
    value: "biographies",
    icon: WrongTextIcon,
  },
  {
    label: "ՔԱՐՏԵԶՆԵՐ",
    value: "maps",
    icon: WrongTextIcon,
  },
  {
    label: "ՀԱՐՑԱԶՐՈՒՅՑՆԵՐ",
    value: "podcasts",
    icon: WrongTextIcon,
  },
] as const;

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
        <section className="scalable-section mt-11 py-12 px-2">
          <div className="main-container">{textContents.introContent}</div>
        </section>
        <section className="bg-gray-100 py-20 px-2">
          <div className="main-container grid gap-x-6 gap-y-5 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            {buttons.map((buttonData) => (
              <Button
                size="xl"
                startAdornment={
                  <buttonData.icon className="fill-current w-8 h-auto" />
                }
                key={buttonData.value}
                variant="contained"
                className="shadow-lg"
                onClick={() => onButtonSelect(buttonData.value)}
                isActive={buttonData.value === selectedButton}
              >
                {buttonData.label}
              </Button>
            ))}
          </div>
        </section>
        <section className="scalable-section">
          <div className="small-container mt-20 px-2">
            {selectedTextContent}
          </div>
        </section>
        <section className="bg-gray-100 mt-20 py-20 px-2">
          <div className="main-container">
            <div className="relative flex justify-center items-center">
              <div className="w-full h-[1px] bg-gray-800 absolute left-0 to-50%" />
              <h2 className="px-5 z-[1] font-default-bold bg-gray-100">
                ՈՒՍՈՒՄՆԱՍԻՐՈՒԹՅՈՒՆՆԵՐ
              </h2>
            </div>
            <div className="text-center text-xl font-bold text-primary mt-5 mb-15">
              Տեսնել ավելին
            </div>
            <ArticlesSlider slides={researchArticles} />
          </div>
        </section>
        <section className="bg-white py-20 px-2">
          <div className="main-container">
            <div className="relative flex justify-center items-center">
              <div className="w-full h-[1px] bg-gray-800 absolute left-0 to-50%" />
              <h2 className="px-5 z-[1] font-default-bold bg-white">
                ԹԱՐԳՄԱՆՈՒԹՅՈՒՆՆԵՐ
              </h2>
            </div>
            <div className="text-center text-xl font-bold text-primary mt-5 mb-15">
              Տեսնել ավելին
            </div>
            <ArticlesSlider slides={researchArticles} />
          </div>
        </section>
        <section className="bg-gray-100 py-20 px-2">
          <div className="main-container">
            <div className="relative flex justify-center items-center">
              <div className="w-full h-[1px] bg-gray-800 absolute left-0 to-50%" />
              <h2 className="px-5 z-[1] font-default-bold bg-gray-100">
                ԲՆԱԳՐԵՐ
              </h2>
            </div>
            <div className="text-center text-xl font-bold text-primary mt-5 mb-15">
              Տեսնել ավելին
            </div>
            <ArticlesSlider slides={researchArticles} />
          </div>
        </section>
        <div className="text-center pt-10 px-2">
          <ScrollTopButton />
        </div>
      </main>
    </div>
  );
};
