import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmblaCarouselType } from "embla-carousel";
import PrevIcon from "@/frontend/website/media/icons/big-arrow-left.svg";
import NextIcon from "@/frontend/website/media/icons/big-arrow-right.svg";
import clsx from "clsx";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;
const buttonBaseStyles =
  "cursor-pointer inline-flex items-center justify-center p-2 text-gray-500 w-10 h-10 md:h-auto rounded-lg shadow-[0px_0px_3px_0px_rgba(217,_217,_217,_0.5)] md:shadow-none hover:not-disabled:text-primary";

export const PrevButton: React.FC<PropType> = ({ className, ...props }) => {
  return (
    <button className={clsx(buttonBaseStyles, className)} {...props}>
      <PrevIcon className="max-w-full max-h-full" />
    </button>
  );
};

export const NextButton: React.FC<PropType> = ({ className, ...props }) => {
  return (
    <button className={clsx(buttonBaseStyles, className)} {...props}>
      <NextIcon className="max-w-full max-h-full" />
    </button>
  );
};
