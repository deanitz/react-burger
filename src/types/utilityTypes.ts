import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit/dist/createAction";

export type Nullable<T> = T | null;

export interface IUniqueId {
  uniqueId: string;
}

export interface IDropItem<TItem> {
  item: TItem;
}

export interface ILimitedRequestInit extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

type ChangeEventFunc<T extends HTMLElement> = React.ChangeEvent<T>;
export type InputChangeEventFunc = ChangeEventFunc<HTMLInputElement>;
export type FormSubmitEventFunc = React.FormEvent<HTMLFormElement>;

export interface IResponseWithSuccess {
  success: boolean;
}

export interface IWebsocketActions<TData> {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<TData>;
  storeMessage: ActionCreatorWithPayload<TData>;
}

export enum WebsocketStatus {
  CONNECTING = "Соединение...",
  ONLINE = "Онлайн",
  OFFLINE = "Отключен",
}
