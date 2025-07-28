import { PAGE_STATUS } from "@/constants";
import { ChannelInstance, Controller, Node } from "@sanity/comlink";
import { RefObject } from "react";

export type EntityBaseModel<T = Record<string, unknown>> = {
  id: number;
  originId?: number | null;
  pageType: PageType;
  status: PAGE_STATUS;
  content: unknown;
  revalidateTags: string[];
  connectedPages: { id: number; title: string; url: string }[];
} & T;

export type EntitySelector = `${PageType}:${number}`;

export type DefaultDataType = Record<EntitySelector, EntityBaseModel>;

export type IWebsiteMessageData<T extends DefaultDataType = DefaultDataType> =
  | IWebsiteRouteChangeMessageData<T>
  | IWebsiteOnEditMessageData;

export type IDashboardMessageData =
  | IDashboardRouteChangeMessageData
  | IDashboardRefetchMessageData;

export type DashboardMessagingContextModel<
  T extends DefaultDataType = DefaultDataType
> = RefObject<{
  controller: Controller;
  channel: ChannelInstance<IDashboardMessageData, IWebsiteMessageData<T>>;
}>;

export type WebsiteMessagingContextModel<
  T extends DefaultDataType = DefaultDataType
> = RefObject<{
  node: Node<IWebsiteMessageData<T>, IDashboardMessageData>;
}>;

// --------------- Dashboard Messages Data ---------------
export const enum DashboardMessageType {
  ROUTE_CHANGE = "routeChange",
  REFETCH = "refetch",
}
export const enum WebsiteMessageType {
  ON_ROUTE_CHANGE = "onRouteChange",
  ON_EDIT = "onEdit",
}

export interface IDashboardRouteChangeMessageData {
  type: DashboardMessageType.ROUTE_CHANGE;
  data: {
    pathname: string;
    searchParams: string | null;
  };
}
export interface IDashboardRefetchMessageData {
  type: DashboardMessageType.REFETCH;
  data: Record<string, unknown>;
}

// --------------- Website Messages Data ---------------

export const enum PageType {
  HOME = "home",
  FAITH = "faith",
  // SAINTS_BEHAVIOR = "saintsBehavior",
  SAINTS_BEHAVIOR_SECTION = "saintsBehaviorSection",
  SAINTS_BEHAVIOR_PAGE = "saintsBehaviorPage",
  BIBLE = "bible",
  BIBLE_CHAPTER = "bibleChapter",
  BIBLE_PAGE = "biblePage",
  ARTICLES = "articles",
  ARTICLE = "article",
  BIBLE_MAIN_PAGE = "bibleMainPage",
}

export type RouteDataModel<T extends DefaultDataType = DefaultDataType> = {
  routeId: number | string;
  routePathname: string;
  routeSearchParams: string | null;
  routeStatus: PAGE_STATUS;
  isRouteDataEditable: boolean;
  data: T;
};

export interface IWebsiteRouteChangeMessageData<
  T extends DefaultDataType = DefaultDataType
> {
  type: WebsiteMessageType.ON_ROUTE_CHANGE;
  data: RouteDataModel<T>;
}

export interface IWebsiteOnEditMessageData {
  type: WebsiteMessageType.ON_EDIT;
  data: {
    routeId: number | string;
    id: number;
    blockType: EditableBlockType;
    editableBlockIdentifier: `${EntitySelector}.${string}`;
  };
}

export const enum EditableBlockType {
  ARTICLES = "articles",
  TEXT = "text",
}
