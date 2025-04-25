"use client";
import hero1 from "@/frontend/website/media/images/home-hero-1.jpg";
import hero2 from "@/frontend/website/media/images/home-hero-2.jpg";
import hero3 from "@/frontend/website/media/images/home-hero-3.jpg";

import { HeroBase } from "./HeroBase";
import {
  HomeHeroSlider,
  HomeHeroSliderProps,
} from "./home-hero-slider/HomeHeroSlider";

const slides: HomeHeroSliderProps["slides"] = [
  {
    id: 1,
    component: () => (
      <HeroBase
        title="ԾԱՆՈԹԱՑԻ՛Ր ԱՍՏԾՈ ԽՈՍՔԻՆ"
        imgAlt="home hero"
        imgSrc={hero1}
      />
    ),
  },
  {
    id: 2,
    component: () => (
      <HeroBase
        title="ԾԱՆՈԹԱՑԻ՛Ր ԱՍՏԾՈ ԽՈՍՔԻՆ 2"
        imgAlt="home hero"
        imgSrc={hero2}
      />
    ),
  },
  {
    id: 3,
    component: () => (
      <HeroBase
        title="ԾԱՆՈԹԱՑԻ՛Ր ԱՍՏԾՈ ԽՈՍՔԻՆ 3"
        imgAlt="home hero"
        imgSrc={hero3}
      />
    ),
  },
];

export const HomeHero = () => {
  return <HomeHeroSlider slides={slides} />;
};
