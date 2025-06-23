import { PAGE_STATUS } from "@/constants";
import { ChannelInstance, Controller, Node } from "@sanity/comlink";
import { RefObject } from "react";

export type DefaultDataType = unknown;

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
  SANCTUARY_ATTITUDE = "sanctuaryAttitude",
  BIBLE = "bible",
  BIBLE_CHAPTER = "bibleChapter",
  BIBLE_PAGE = "biblePage",
  ARTICLES = "articles",
  ARTICLE = "article",
  BIBLE_MAIN_PAGE = "bibleMainPage",
}

export type IPageData<T extends DefaultDataType = DefaultDataType> = {
  id: number;
  originId?: number | null; // if this is a draft, it will have an originalId
  isEditable: true;
  pathname: string;
  searchParams: string | null;
  pageType: PageType;
  status: PAGE_STATUS;
  data: T;
};

export interface IWebsiteRouteChangeMessageData<
  T extends DefaultDataType = DefaultDataType
> {
  type: WebsiteMessageType.ON_ROUTE_CHANGE;
  data: IPageData<T>;
}

export interface IWebsiteOnEditMessageData {
  type: WebsiteMessageType.ON_EDIT;
  data: {
    id: number;
    blockType: EditableBlockType;
    pathname: string;
    searchParams: string | null;
    identifier: string;
  };
}

export const enum EditableBlockType {
  ARTICLES = "articles",
  TEXT = "text",
}
