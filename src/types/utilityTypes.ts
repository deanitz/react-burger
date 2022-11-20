export type Nullable<T> = T | null;

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
