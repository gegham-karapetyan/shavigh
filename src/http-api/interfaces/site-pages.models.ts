import { PAGE_STATUS } from "@/constants";

export interface StaticPageInternalModel {
  id: number;
  uniqueName: string; // like "home" or "faith"
  originId?: number | null; // if this is a draft, it will have an originalId
  status: PAGE_STATUS; // as
  content: string; //like { welcome: string; articles: number[]; };
}
export interface HomePageContentInternalModel {
  welcomeContent: string;
  articles: number[];
}

export interface HomePageContentModel {
  welcomeContent: string;
  articles: GetArticleListItemModel[];
}
export interface FaithPageContentInternalModel {
  introductionContent: string;
  religiousContent: string;
  historicalContent: string;
  beliefsContent: string;
  biographiesContent: string;
  mapsContent: string;
  podcastsContent: string;
  researchArticles: number[];
  translationsArticles: number[];
  bibliographiesArticles: number[];
}
export interface FaithPageContentModel {
  introductionContent: string;
  religiousContent: string;
  historicalContent: string;
  beliefsContent: string;
  biographiesContent: string;
  mapsContent: string;
  podcastsContent: string;
  researchArticles: GetArticleListItemModel[];
  translationsArticles: GetArticleListItemModel[];
  bibliographiesArticles: GetArticleListItemModel[];
}

export interface UpdateStaticPageInternalModel {
  id: number;
  uniqueName: string;
  originId?: number | null; // if this is a draft, it will have an originalId
  content: Record<string, unknown>; // like { welcome: string; articles: number[]; };
}

export interface UpdateHomePageModel {
  id: number;
  uniqueName: string;
  originId?: number | null; // if this is a draft, it will have an originalId
  content: {
    welcomeContent: string;
    articles: number[];
  };
}

export interface GetHomePageModel {
  id: number;
  originId?: number | null; // if this is a draft, it will have an originalId
  status: PAGE_STATUS;
  content: HomePageContentModel;
}

export interface GetFaithPageModel {
  id: number;
  originId?: number | null;
  status: PAGE_STATUS;
  content: FaithPageContentModel;
}

export interface GetArticleListItemModel {
  id: number;
  title: string;
  //   slug: string;
  description: string;
  url: string;
  //   status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface GetArticlePageModel {
  id: number;
  title: string;
  originId?: number | null;
  //   slug: string;
  content: string;
  status: PAGE_STATUS;
  createdAt: string;
  updatedAt: string;
}

export interface BibleMainPageContentModel {
  content: string;
}

export interface GetBibleMainPageModel {
  id: number;
  originId?: number | null;
  status: PAGE_STATUS;
  content: BibleMainPageContentModel;
}

export interface BibleBookModel {
  id: number;
  title: string;
  slug: string;
  translationName: string;
  chapters: {
    url: string;
    title: string;
  }[];
}

export interface TestamentModel {
  name: string;
  uniqueName: string;
  books: BibleBookModel[];
}
export interface BibleNavDataModel {
  newTestament: Record<string, BibleBookModel[]>;
  oldTestament: Record<string, BibleBookModel[]>;
}
export interface GetBibleDynamicPageModel {
  id: number;
  originId?: number | null;
  content: string;
  title: string;
  url: string;
  status: PAGE_STATUS;
  linkToDefaultContent: null | string;
  nextLink: string | null;
  prevLink: string | null;
  bibleBookId?: number;
  attached: boolean;
}

export interface UpdateBibleDynamicPageModel {
  id?: number;
  originId?: number | null;
  content: string;
  title: string;
  url: string;
  status: PAGE_STATUS;
  linkToDefaultContent: null | string;
  nextLink: string | null;
  prevLink: string | null;
  bibleBookId?: number;
  bibleBookChapterId?: number;
  attached?: boolean;
  bibleBookChapterUnattachedPageIds?: number[];
}
export interface GetSaintsBehaviorSectionModel {
  id: number;
  originId?: number | null;
  title: string;
  url: string;
  status: PAGE_STATUS;
  content: string;
}

export interface UpdateSaintsBehaviorSectionModel {
  id?: number;
  originId?: number | null;
  title: string;
  url: string;
  status: PAGE_STATUS;
  content: string;
}

export interface GetSaintsBehaviorModel {
  id: number;
  title: string;
  url:
    | "saintsbehavior/echmiadzin"
    | "saintsbehavior/ararat"
    | "saintsbehavior/grabar";
  status: PAGE_STATUS;
  sections: {
    id: number;
    title: string;
    url: string;
  }[];
}
export interface GetSaintsBehaviorPageModel {
  id: number;
  title: string;
  url: string;
  status: PAGE_STATUS;
  sectionId: number;
  attached: boolean;
  content: string;
}

export interface UpdateSaintsBehaviorPageModel {
  id?: number;
  originId?: number | null;
  title: string;
  url: string;
  status?: PAGE_STATUS;
  sectionId: number;
  attached: boolean;
  content: string;
}
