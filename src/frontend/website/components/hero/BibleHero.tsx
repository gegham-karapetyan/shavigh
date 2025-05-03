import hero from "@/frontend/website/media/images/bible-hero.jpg";

import { HeroBase } from "./HeroBase";

export const BibleHero = () => {
  return (
    <HeroBase
      titlePosition="left"
      title="ՍԿԶԲԻՑ ԷՐ ԽՈՍՔԸ"
      imgSrc={hero}
      imgAlt="bible hero"
    />
  );
};
