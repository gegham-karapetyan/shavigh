// import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import {
  HomeLayout,
  HomeLayoutProps,
} from "@/frontend/website/components/pages-layouts/HomeLayout";
import { FC } from "react";

export interface HomePageProps {
  welcomeContent: string; //html string
  articles: HomeLayoutProps["articles"];
}

const Content = () => {
  return (
    <div>
      <h1 className="text-primary">Welcome to the Home Page</h1>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div>
          <br />
          <h2>Subtitle </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
          <br />
          <h2>Subtitle 2</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
          <br />
          <h2>Subtitle 3</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
          <br />
          <h2>Subtitle 4</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
            minus nobis eveniet dicta libero, consectetur ea deleniti rerum
            reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
            quod eum.
          </p>
        </div>
      </div>
    </div>
  );
};

export const HomePage: FC<HomePageProps> = ({ articles }) => {
  return (
    <HomeLayout
      // welcomeContent={<HtmlContentRenderer content={welcomeContent} />}
      welcomeContent={<Content />}
      articles={articles}
    />
  );
};
