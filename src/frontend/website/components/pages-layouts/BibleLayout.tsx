import { BibleNavMenu } from "../bible-nav-menu/BibleNavMenu";
import { BibleHero } from "../hero/BibleHero";

export const BibleLayout = () => {
  return (
    <div>
      <main>
        <BibleHero />
        <BibleNavMenu />
      </main>
    </div>
  );
};
