import useEmblaCarousel from "embla-carousel-react";
import { ArticleCard, ArticleCardProps } from "../ui/cards/ArticleCard";
import { FC } from "react";
import clsx from "clsx";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./SliderControlButtons";

export interface ArticlesSliderProps {
  slides: ArticleCardProps["data"][];
  className?: string;
}
export const ArticlesSlider: FC<ArticlesSliderProps> = ({
  slides,
  className,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const controls = usePrevNextButtons(emblaApi);
  return (
    <div className={clsx("relative pb-16 md:pb-0 md:px-8", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex w-[calc(100%+8px)] -ml-1">
          {slides.map((slide) => (
            <div
              className="shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3  2xl:basis-1/4"
              key={slide.id}
            >
              <ArticleCard
                className="h-full border-r-[1px] px-10"
                data={slide}
              />
            </div>
          ))}
        </div>
      </div>
      <PrevButton
        onClick={controls.onPrevButtonClick}
        disabled={controls.prevBtnDisabled}
        className="absolute bottom-0 left-1/2 md:bottom-auto md:left-0 md:top-1/2 -translate-x-12 md:-translate-x-0 md:-translate-y-1/2"
      />
      <NextButton
        onClick={controls.onNextButtonClick}
        disabled={controls.nextBtnDisabled}
        className="absolute bottom-0 right-1/2 md:bottom-auto md:right-0 md:top-1/2 translate-x-12 md:translate-x-0 md:-translate-y-1/2"
      />
    </div>
  );
};
