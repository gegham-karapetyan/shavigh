import { staticPages } from "@/backend/services/static-pages-service";
import { HomePage } from "@/frontend/website/site-pages/home/HomePage";

export default async function Home() {
  const result = await staticPages.getPage("home");
  const { welcome } = JSON.parse(result.content);
  console.log("res", result);
  return (
    <HomePage
      articles={[
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
      ]}
      welcomeContent={welcome}
    />
  );
}
