import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

const titlePositionClasses = {
  left: "xl:text-left",
  center: "xl:text-center",
  right: "xl:text-right",
};

export interface HeroBaseProps {
  title?: string;
  titlePosition?: "left" | "center" | "right";
  imgSrc: StaticImageData;
  imgAlt: string;
}
export const HeroBase: FC<HeroBaseProps> = ({
  imgSrc,
  title,
  imgAlt,
  titlePosition = "center",
}) => {
  return (
    <div className="relative overflow-hidden flex justify-center items-center">
      <Image
        className="w-full h-auto min-h-[400px] object-cover"
        src={imgSrc}
        alt={imgAlt}
        priority
      />
      {title && (
        <h1
          className={clsx(
            "main-container absolute text-center font-default-bold text-white text-4xl",
            titlePositionClasses[titlePosition]
          )}
        >
          {title}
        </h1>
      )}
    </div>
  );
};
