import { FC } from "react";
import Image, { StaticImageData } from "next/image";

export interface HeroBaseProps {
  title?: string;
  imgSrc: StaticImageData;
  imgAlt: string;
}
export const HeroBase: FC<HeroBaseProps> = ({ imgSrc, title, imgAlt }) => {
  return (
    <div className="relative overflow-hidden flex justify-center items-center">
      <Image
        className="w-full min-h-[400px] object-cover"
        src={imgSrc}
        alt={imgAlt}
      />
      {title && (
        <h1 className="absolute font-default-bold text-white text-center text-2xl">
          {title}
        </h1>
      )}
    </div>
  );
};
