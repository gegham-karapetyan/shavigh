import { StaticPagesType } from "@/constants";
import { UpdateDraftHomePage } from "@/interfaces/static-pages.mode";
import { z } from "zod";

export const homePageValidationSchema: z.ZodType<UpdateDraftHomePage> =
  z.object({
    content: z.object({
      welcome: z.string(),
      articles: z.array(z.number()),
    }),
  });

export const schemas: Record<
  StaticPagesType,
  z.ZodType<UpdateDraftHomePage>
> = {
  home: homePageValidationSchema,
  "sanctuary-attitude": homePageValidationSchema,
  articles: homePageValidationSchema,
  bible: homePageValidationSchema,
  books: homePageValidationSchema,
  faith: homePageValidationSchema,
  podcasts: homePageValidationSchema,
};
