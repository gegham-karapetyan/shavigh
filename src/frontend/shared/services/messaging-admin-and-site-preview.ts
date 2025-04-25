"use client";
type SitePreviewMessageDataModel =
  | ISitePreviewReady
  | ISitePreviewRouteChange
  | ISitePreviewOnEdit;

type SitePreviewHandlersType = {
  [K in SitePreviewMessageType]: Set<
    (msg: Extract<SitePreviewMessageDataModel, { type: K }>) => void
  >;
};

export const enum SitePreviewMessageType {
  RouteChange = "preview-route-change",
  PreviewReady = "preview-ready",
  OnEdit = "preview-on-edit",
}

export type ISitePreviewReady = {
  type: SitePreviewMessageType.PreviewReady;
};

export type ISitePreviewRouteChange = {
  type: SitePreviewMessageType.RouteChange;
  pathname: string;
  query?: string | null;
};

export type ISitePreviewOnEdit = {
  type: SitePreviewMessageType.OnEdit;
  pathname: string;
  query?: string | null;
  identifier: string;
  blockName: string;
};
type AdminDashboardMessageDataModel =
  | IAdminDashboardRouteChange
  | IAdminDashboardRefetch;

type AdminDashboardHandlersType = {
  [K in AdminDashboardMessageType]: Set<
    (msg: Extract<AdminDashboardMessageDataModel, { type: K }>) => void
  >;
};

export const enum AdminDashboardMessageType {
  RouteChange = "should-route-change",
  Refetch = "should-refetch",
}

export type IAdminDashboardRouteChange = {
  type: AdminDashboardMessageType.RouteChange;
  pathname: string;
  query?: string | null;
};

export type IAdminDashboardRefetch = {
  type: AdminDashboardMessageType.Refetch;
  identifier: string;
  blockName: string;
};
const getEmptyAdminDashboardMessagingHandlersState = () => ({
  [SitePreviewMessageType.RouteChange]: new Set<
    (msg: ISitePreviewRouteChange) => void
  >(),
  [SitePreviewMessageType.PreviewReady]: new Set<
    (msg: ISitePreviewReady) => void
  >(),
  [SitePreviewMessageType.OnEdit]: new Set<(msg: ISitePreviewOnEdit) => void>(),
});

export class AdminDashboardMessagingChannel {
  private sitePreviewHandlers: SitePreviewHandlersType =
    getEmptyAdminDashboardMessagingHandlersState();

  private siteIframe: HTMLIFrameElement | null = null;
  // in case when admin-dashboard send message before site-preview is ready
  private pendingMessages = [] as AdminDashboardMessageDataModel[];
  private iframeName: string;

  constructor(name: string) {
    this.iframeName = name;
    const siteIframe = window.document.querySelector(
      `iframe[name=${name}]`
    ) as HTMLIFrameElement | null;
    if (siteIframe?.contentDocument?.readyState === "complete") {
      this.siteIframe = siteIframe;
    }
    this.handleMessageEvent = this.handleMessageEvent.bind(this);

    window.addEventListener("message", this.handleMessageEvent);
  }
  private handleMessageEvent = (event: MessageEvent) => {
    this.handleMessage(event.data as SitePreviewMessageDataModel);
  };
  private handlePendingMessages() {
    this.pendingMessages.forEach((message) => {
      this.sendMessageToPreview(message);
    });
    this.pendingMessages = [];
  }

  private handleMessage = (message: SitePreviewMessageDataModel) => {
    if (message && this.sitePreviewHandlers[message.type]) {
      if (
        this.pendingMessages.length &&
        message.type === SitePreviewMessageType.PreviewReady
      ) {
        // if we get message from site-preview that means it is ready
        // and we can send pending messages
        this.siteIframe = document.querySelector(
          `iframe[name=${this.iframeName}]`
        ) as HTMLIFrameElement | null;
        this.handlePendingMessages();
      }
      this.sitePreviewHandlers[message.type].forEach((handler) =>
        (handler as (msg: SitePreviewMessageDataModel) => void)(message)
      );
    }
  };

  private subscribeToPreview<K extends SitePreviewMessageType>(
    type: K,
    handler: (msg: Extract<SitePreviewMessageDataModel, { type: K }>) => void
  ) {
    this.sitePreviewHandlers[type].add(handler);
    return () => this.sitePreviewHandlers[type].delete(handler);
  }

  private sendMessageToPreview(message: AdminDashboardMessageDataModel) {
    if (this.siteIframe && this.siteIframe.contentWindow) {
      this.siteIframe.contentWindow.postMessage(message, "*");
    } else {
      this.pendingMessages.push(message);
    }
  }
  sendPreviewToRouteChange(data: Omit<IAdminDashboardRouteChange, "type">) {
    this.sendMessageToPreview({
      type: AdminDashboardMessageType.RouteChange,
      ...data,
    });
  }
  sendPreviewToRefetch(data: Omit<IAdminDashboardRefetch, "type">) {
    this.sendMessageToPreview({
      type: AdminDashboardMessageType.Refetch,
      ...data,
    });
  }
  onPreviewRouteChange(handler: (msg: ISitePreviewRouteChange) => void) {
    return this.subscribeToPreview(SitePreviewMessageType.RouteChange, handler);
  }
  onPreviewReady(handler: (msg: ISitePreviewReady) => void) {
    if (this.siteIframe !== null) {
      handler({ type: SitePreviewMessageType.PreviewReady });
      return () => {};
    }
    return this.subscribeToPreview(
      SitePreviewMessageType.PreviewReady,
      handler
    );
  }
  destroy() {
    window.removeEventListener("message", this.handleMessageEvent);
    this.siteIframe = null;
    this.sitePreviewHandlers = getEmptyAdminDashboardMessagingHandlersState();
    this.pendingMessages = [];
  }
}

const getEmptySitePreviewMessagingHandlersState = () => ({
  [AdminDashboardMessageType.RouteChange]: new Set<
    (msg: IAdminDashboardRouteChange) => void
  >(),
  [AdminDashboardMessageType.Refetch]: new Set<
    (msg: IAdminDashboardRefetch) => void
  >(),
});

export class SitePreviewMessagingChannel {
  private adminDashboardHandlers: AdminDashboardHandlersType =
    getEmptySitePreviewMessagingHandlersState();

  constructor() {
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
    window.addEventListener("message", this.handleMessageEvent);
  }
  private handleMessageEvent = (event: MessageEvent) => {
    this.handleMessage(event.data as AdminDashboardMessageDataModel);
  };

  private handleMessage = (message: AdminDashboardMessageDataModel) => {
    if (message && this.adminDashboardHandlers[message.type]) {
      this.adminDashboardHandlers[message.type].forEach((handler) =>
        (handler as (msg: AdminDashboardMessageDataModel) => void)(message)
      );
    }
  };

  /**
   * @returns unsubscribe function
   */
  private subscribeToAdminDashboard<K extends AdminDashboardMessageType>(
    type: K,
    handler: (msg: Extract<AdminDashboardMessageDataModel, { type: K }>) => void
  ) {
    this.adminDashboardHandlers[type].add(handler);
    return () => this.adminDashboardHandlers[type].delete(handler);
  }
  /**
   * @returns unsubscribe function
   */
  onNeedToRefetch(handler: (msg: IAdminDashboardRefetch) => void) {
    return this.subscribeToAdminDashboard(
      AdminDashboardMessageType.Refetch,
      handler
    );
  }
  /**
   * @returns unsubscribe function
   */
  onNeedToRouteChange(handler: (msg: IAdminDashboardRouteChange) => void) {
    return this.subscribeToAdminDashboard(
      AdminDashboardMessageType.RouteChange,
      handler
    );
  }

  private sendMessageToAdminDashboard(message: SitePreviewMessageDataModel) {
    window.parent.postMessage(message, "*");
  }
  sendRouteChange(data: Omit<ISitePreviewRouteChange, "type">) {
    this.sendMessageToAdminDashboard({
      type: SitePreviewMessageType.RouteChange,
      ...data,
    });
  }
  sendOnEdit(data: Omit<ISitePreviewOnEdit, "type">) {
    this.sendMessageToAdminDashboard({
      type: SitePreviewMessageType.OnEdit,
      ...data,
    });
  }
  sendPreviewReady() {
    this.sendMessageToAdminDashboard({
      type: SitePreviewMessageType.PreviewReady,
    });
  }
  destroy() {
    window.removeEventListener("message", this.handleMessageEvent);
    this.adminDashboardHandlers = getEmptySitePreviewMessagingHandlersState();
  }
}
