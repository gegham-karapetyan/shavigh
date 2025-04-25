import { FaithLayout } from "@/frontend/website/components/pages-layouts/FaithLayout";

const Content = () => {
  return (
    <div>
      <h1 className="text-primary">{"<<Welcome to the Faith Page>>"}</h1>
      <br />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div>
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
          </p>
          <br />
        </div>
        <div>
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
      </div>
    </div>
  );
};
const Content1 = () => {
  return (
    <div>
      <h1 className="text-primary">Content1</h1>
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
    </div>
  );
};
const Content2 = () => {
  return (
    <div>
      <h1 className="text-primary">Content2</h1>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, facilis!
      </p>
    </div>
  );
};
const Content3 = () => {
  return (
    <div>
      <h1 className="text-primary">Content3</h1>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, rem
        blanditiis ex, dolorem adipisci sunt beatae autem ipsum cumque earum
        quis eveniet minima est vel soluta iusto doloribus, perspiciatis magnam.
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
        minus nobis eveniet dicta libero, consectetur ea deleniti rerum
        reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
        quod eum.
      </p>
    </div>
  );
};
const Content4 = () => {
  return (
    <div>
      <h1 className="text-primary">Content4</h1>
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
        dignissimos dolorem eligendi esse magnam quibusdam, ad error blanditiis.
        Maiores culpa libero debitis.
      </p>
    </div>
  );
};
const Content5 = () => {
  return (
    <div>
      <h1 className="text-primary">Content5</h1>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa
        minus nobis eveniet dicta libero, consectetur ea deleniti rerum
        reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
        quod eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
        culpa minus nobis eveniet dicta libero, consectetur ea deleniti rerum
        reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt
        quod eum.
      </p>
    </div>
  );
};
const Content6 = () => {
  return (
    <div>
      <h1 className="text-primary">Content6</h1>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa nde!
        Nisi reiciendis ea inventore, laborum quia deserunt quod eum.
      </p>
    </div>
  );
};

export default function FaithPage() {
  return (
    <FaithLayout
      textContents={{
        introContent: <Content />,
        beliefsContent: <Content3 />,
        biographiesContent: <Content4 />,
        historicalContent: <Content2 />,
        mapsContent: <Content5 />,
        podcastsContent: <Content6 />,
        religiousContent: <Content1 />,
      }}
      researchArticles={[
        {
          id: 1,
          title: "Article 1",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa minus nobis eveniet dicta libero, consectetur ea deleniti rerum reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt quod eum.",
          articleUrl: "/",
          date: "2023-10-01",
        },
        {
          id: 2,
          title: "Article 2",
          description:
            "Lorem ipsum dolor m ipsum dolor sit amet co sit amet consectetur adipisicing elit. Nemo culpa minus nobis eveniet dicta libero, consectetur ea deleniti rerum reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt quod eum.",
          articleUrl: "/",
          date: "2023-10-01",
        },
        {
          id: 3,
          title: "Article 3",
          description:
            "Lorem ipsum dfgh dfghdf sdf gsdfh sdfh sgfh df  dolor sit amet consectetur adipisicing elit. Nemo culpa minus nobis eveniet dicta libero, consectetur ea deleniti rerum reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt quod eum.",
          articleUrl: "/",
          date: "2023-10-01",
        },
        {
          id: 4,
          title: "Article 4",
          description:
            "Lorem ipsum dfgh dfghdf sdf gsdfh sdfh sgfh df  dolor sit amet consectetur adipisicing elit. Nemo culpa minus nobis eveniet dicta libero, consectetur ea deleniti rerum reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt quod eum.",
          articleUrl: "/",
          date: "2023-10-01",
        },
        {
          id: 5,
          title: "Article 5",
          description:
            "Lorem ipsum dfgh dfghdf sdf gsdfh sdfh sgfh df  dolor sit amet consectetur adipisicing elit. Nemo culpa minus nobis eveniet dicta libero, consectetur ea deleniti rerum reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt quod eum.",
          articleUrl: "/",
          date: "2023-10-01",
        },
        {
          id: 6,
          title: "Article 6",
          description:
            "Lorem ipsum dfgh dfghdf sdf gsdfh sdfh sgfh df  dolor sit amet consectetur adipisicing elit. Nemo culpa minus nobis eveniet dicta libero, consectetur ea deleniti rerum reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt quod eum.",
          articleUrl: "/",
          date: "2023-10-01",
        },
        {
          id: 7,
          title: "Article 7",
          description:
            "Lorem ipsum dfgh dfghdf sdf gsdfh sdfh sgfh df  dolor sit amet consectetur adipisicing elit. Nemo culpa minus nobis eveniet dicta libero, consectetur ea deleniti rerum reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt quod eum.",
          articleUrl: "/",
          date: "2023-10-01",
        },
        {
          id: 8,
          title: "Article 8",
          description:
            "Lorem ipsum dfgh dfghdf sdf gsdfh sdfh sgfh df  dolor sit amet consectetur adipisicing elit. Nemo culpa minus nobis eveniet dicta libero, consectetur ea deleniti rerum reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt quod eum.",
          articleUrl: "/",
          date: "2023-10-01",
        },
        {
          id: 9,
          title: "Article 9",
          description:
            "Lorem ipsum dfgh dfghdf sdf gsdfh sdfh sgfh df  dolor sit amet consectetur adipisicing elit. Nemo culpa minus nobis eveniet dicta libero, consectetur ea deleniti rerum reiciendis unde! Nisi reiciendis ea inventore, laborum quia deserunt quod eum.",
          articleUrl: "/",
          date: "2023-10-01",
        },
      ]}
    />
  );
}
