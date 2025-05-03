import useEmblaCarousel from "embla-carousel-react";
import { ArticleCard, ArticleCardProps } from "../ui/cards/ArticleCard";
import { FC } from "react";

export interface ArticlesSliderProps {
  slides: ArticleCardProps["data"][];
}
export const ArticlesSlider: FC<ArticlesSliderProps> = ({ slides }) => {
  const [emblaRef] = useEmblaCarousel({ align: "start" });
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex w-[calc(100%+8px)] -ml-1">
        {slides.map((slide) => (
          <div
            className="shrink-0 grow-0  xl:basis-[calc(100%/3)]  2xl:basis-1/4"
            key={slide.id}
          >
            <ArticleCard className="border-r-[1px] px-10" data={slide} />
          </div>
        ))}
      </div>
    </div>
  );
};
