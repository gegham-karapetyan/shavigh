import { FC, Fragment, PropsWithChildren, ReactNode } from "react";

export interface SaintsBehaviorSectionLayoutProps {
  section: NonNullable<ReactNode>;
  sectionTitle: string;
}

export const SaintsBehaviorSectionLayout: FC<
  PropsWithChildren<SaintsBehaviorSectionLayoutProps>
> = ({ section, children, sectionTitle }) => {
  return (
    <Fragment>
      <section className="main-container scalable-section mt-11 py-12">
        <h2>{sectionTitle}</h2>
        <div className="pl-6 mt-4">{section}</div>
      </section>
      <div className="main-container my-10">
        <hr />
      </div>

      <section className="small-container scalable-section mt-11 py-12">
        {children}
      </section>
    </Fragment>
  );
};
