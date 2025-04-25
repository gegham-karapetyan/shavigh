import hero from "@/frontend/website/media/images/sanctuary-attitude-hero.jpg";

import { HeroBase } from "./HeroBase";

export const SanctuaryAttitudeHero = () => {
  return (
    <HeroBase
      title="ԱՆՁԻՆՔ ՆՎԻՐՅԱԼՔ"
      imgSrc={hero}
      imgAlt="sanctuary attitude hero"
    />
  );
};
