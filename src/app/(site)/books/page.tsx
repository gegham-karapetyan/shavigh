import { BooksCatalogPage } from "@/frontend/website/site-pages/books/BooksCatalogPage";

export default function Page() {
  return (
    <BooksCatalogPage
      books={[
        {
          id: 1,
          imgSrc: "https://picsum.photos/600/900/?random=1",
          title: "The Enchanted Forest",
          author: "Ava Green",
          description:
            "Dive into a magical world where trees whisper secrets and mythical creatures roam. A tale of courage, friendship, and the power of nature.",
          bookUrl: "/books/1",
          date: "2023-09-15",
        },
        {
          id: 2,
          imgSrc: "https://picsum.photos/600/900/?random=2",
          title: "Beyond the Stars",
          author: "Liam Carter",
          description:
            "An epic space adventure following a group of explorers as they uncover the mysteries of a distant galaxy and face unimaginable challenges.",
          bookUrl: "/books/2",
          date: "2023-08-10",
        },
        {
          id: 3,
          imgSrc: "https://picsum.photos/600/900/?random=3",
          title: "The Forgotten Kingdom",
          author: "Sophia Bennett",
          description:
            "A gripping historical fiction novel about a lost kingdom, a hidden treasure, and the quest to uncover the truth buried in time.",
          bookUrl: "/books/3",
          date: "2023-07-20",
        },
        {
          id: 4,
          imgSrc: "https://picsum.photos/600/900/?random=4",
          title: "Whispers of the Ocean",
          author: "Ethan Harper",
          description:
            "A heartwarming story of a marine biologist who discovers a mysterious message in a bottle that changes her life forever.",
          bookUrl: "/books/4",
          date: "2023-06-05",
        },
        {
          id: 5,
          imgSrc: "https://picsum.photos/600/900/?random=5",
          title: "The Shadow's Game",
          author: "Isabella Knight",
          description:
            "A thrilling mystery novel about a detective who must outsmart a cunning criminal mastermind in a deadly game of cat and mouse.",
          bookUrl: "/books/5",
          date: "2023-05-12",
        },
        {
          id: 6,
          imgSrc: "https://picsum.photos/600/900/?random=6",
          title: "Echoes of the Past",
          author: "Noah Reed",
          description:
            "A time-traveling adventure where a historian is transported to ancient civilizations and must find a way back to the present.",
          bookUrl: "/books/6",
          date: "2023-04-18",
        },
        {
          id: 7,
          imgSrc: "https://picsum.photos/600/900/?random=7",
          title: "The Art of Letting Go",
          author: "Mia Collins",
          description:
            "A heartfelt self-help book that explores the journey of healing, forgiveness, and finding inner peace in the face of life's challenges.",
          bookUrl: "/books/7",
          date: "2023-03-25",
        },
        {
          id: 8,
          imgSrc: "https://picsum.photos/600/900/?random=8",
          title: "Code of the Future",
          author: "James Walker",
          description:
            "A sci-fi thriller about a programmer who creates an AI that becomes self-aware, leading to a battle between humanity and technology.",
          bookUrl: "/books/8",
          date: "2023-02-14",
        },
        {
          id: 9,
          imgSrc: "https://picsum.photos/600/900/?random=9",
          title: "The Last Symphony",
          author: "Olivia Harper",
          description:
            "A moving tale of a composer who struggles to finish his final masterpiece while battling personal demons.",
          bookUrl: "/books/9",
          date: "2023-01-10",
        },
        {
          id: 10,
          imgSrc: "https://picsum.photos/600/900/?random=10",
          title: "The Crystal Chronicles",
          author: "Lucas Gray",
          description:
            "An epic fantasy adventure where a young hero must gather magical crystals to save their kingdom from an ancient evil.",
          bookUrl: "/books/10",
          date: "2022-12-05",
        },
        {
          id: 11,
          imgSrc: "https://picsum.photos/600/900/?random=11",
          title: "The Silent Witness",
          author: "Emma Brooks",
          description:
            "A gripping courtroom drama about a lawyer who uncovers shocking secrets while defending a mysterious client.",
          bookUrl: "/books/11",
          date: "2022-11-15",
        },
        {
          id: 12,
          imgSrc: "https://picsum.photos/600/900/?random=12",
          title: "The Infinite Horizon",
          author: "Ethan Cole",
          description:
            "A philosophical exploration of humanity's place in the universe, told through the eyes of an astronaut on a one-way mission to Mars.",
          bookUrl: "/books/12",
          date: "2022-10-20",
        },
        {
          id: 13,
          imgSrc: "https://picsum.photos/600/900/?random=13",
          title: "The Midnight Library",
          author: "Nora Blake",
          description:
            "A magical library that allows visitors to explore the lives they could have lived, and the lessons they learn along the way.",
          bookUrl: "/books/13",
          date: "2022-09-12",
        },
        {
          id: 14,
          imgSrc: "https://picsum.photos/600/900/?random=14",
          title: "The Vanishing Point",
          author: "Liam Hayes",
          description:
            "A psychological thriller about an artist who discovers that his paintings hold the key to solving a series of disappearances.",
          bookUrl: "/books/14",
          date: "2022-08-18",
        },
        {
          id: 15,
          imgSrc: "https://picsum.photos/600/900/?random=15",
          title: "The Alchemist's Secret",
          author: "Sophia Carter",
          description:
            "A historical mystery about a young scholar who uncovers an ancient alchemist's formula for eternal life.",
          bookUrl: "/books/15",
          date: "2022-07-25",
        },
        {
          id: 16,
          imgSrc: "https://picsum.photos/600/900/?random=16",
          title: "The Wanderer's Tale",
          author: "Noah Bennett",
          description:
            "A poetic journey through the eyes of a nomad who travels across continents in search of meaning and belonging.",
          bookUrl: "/books/16",
          date: "2022-06-30",
        },
        {
          id: 17,
          imgSrc: "https://picsum.photos/600/900/?random=17",
          title: "The Quantum Paradox",
          author: "Isabella Reed",
          description:
            "A mind-bending sci-fi novel about a physicist who discovers a way to manipulate time, with unintended consequences.",
          bookUrl: "/books/17",
          date: "2022-05-22",
        },
        {
          id: 18,
          imgSrc: "https://picsum.photos/600/900/?random=18",
          title: "The Secret Gardeners",
          author: "Mia Harper",
          description:
            "A whimsical story about a group of children who discover a magical garden that grows plants with extraordinary powers.",
          bookUrl: "/books/18",
          date: "2022-04-15",
        },
      ]}
    />
  );
}
