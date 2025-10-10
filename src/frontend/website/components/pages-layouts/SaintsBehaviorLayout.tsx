import { FC, PropsWithChildren } from "react";
import { GetSaintsBehaviorModel } from "@/http-api/interfaces/site-pages.models";
import { NavLink } from "../ui/links/NavLink";
import { SaintsBehaviorHero } from "../hero/SaintsBehaviorHero";
import { ScrollTopButton } from "../ui/buttons/ScrollTopButton";

export interface SaintsBehaviorLayoutProps {
  sections: GetSaintsBehaviorModel["sections"];
}

export const SaintsBehaviorLayout: FC<
  PropsWithChildren<SaintsBehaviorLayoutProps>
> = ({ sections, children }) => {
  return (
    <div>
      <main>
        <SaintsBehaviorHero />
        <section className="main-container scalable-section my-11 py-12">
          <h2 className="">ՎԱՐՔ ՍՐԲՈՑ ԵՎ ՏՈՆԱՑՈՒՅՑ</h2>
          <p className="max-w-[10000px] mt-4">
            Գիրք որ կոչի Յայսմաւուրք: Որ պարունակէ յինքեան զճառս վարուց սրբոց...
            ի հայրապետութեան սրբոյն Էջմիածնի տեառն Աբրահամու սրբազան
            կաթողիկոսի... ի թուին Հայոց ռճհթ մարտի բ:
          </p>
        </section>
        <section className="bg-gray-100 py-20">
          <div className="main-container grid gap-x-6 gap-y-5 grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
            {sections.map((section) => (
              <NavLink
                prefetch={false}
                href={"/" + section.url}
                variant="contained"
                size="lg"
                key={section.id}
                className="uppercase"
              >
                {section.title.split(" ").at(-1)?.trim()}
              </NavLink>
            ))}
          </div>
        </section>
        {children}
      </main>
      <div className="text-center pt-10 px-2">
        <ScrollTopButton />
      </div>
    </div>
  );
};
