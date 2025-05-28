"use client";
import hero from "@/frontend/website/media/images/bible-hero.jpg";

import { HeroBase } from "./HeroBase";
// import { useSelectedLayoutSegment } from "next/navigation";

export const BibleHero = () => {
  // const p = useSelectedLayoutSegment();
  return (
    <HeroBase
      titlePosition="left"
      title="ՍԿԶԲԻՑ ԷՐ ԽՈՍՔԸ"
      imgSrc={hero}
      imgAlt="bible hero"
    />
  );
};
