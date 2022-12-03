import { rootReducer } from "../services/reducers/rootReducer";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createSocketMiddleware } from "../services/middleware/websocketMiddleware";
import {
  connect as ordersHistoryConnect,
  disconnect as ordersHistoryDisconnect,
  wsConnecting as ordersHistoryConnecting,
  wsOpen as ordersHistoryOpen,
  wsClose as ordersHistoryClose,
  wsError as ordersHistoryError,
  wsMessage as ordersHistoryMessage,
} from "../services/slices/ordersHistorySlice";

import {
  connect as ordersFeedConnect,
  disconnect as ordersFeedDisconnect,
  wsConnecting as ordersFeedConnecting,
  wsOpen as ordersFeedOpen,
  wsClose as ordersFeedClose,
  wsError as ordersFeedError,
  wsMessage as ordersFeedMessage,
} from "../services/slices/ordersFeedSlice";
import { OrderDataBrief } from "../types/dataTypes";

const ordersHistoryActions = {
  connect: ordersHistoryConnect,
  disconnect: ordersHistoryDisconnect,
  wsConnecting: ordersHistoryConnecting,
  wsOpen: ordersHistoryOpen,
  wsClose: ordersHistoryClose,
  wsError: ordersHistoryError,
  wsMessage: ordersHistoryMessage,
};

const ordersFeedActions = {
  connect: ordersFeedConnect,
  disconnect: ordersFeedDisconnect,
  wsConnecting: ordersFeedConnecting,
  wsOpen: ordersFeedOpen,
  wsClose: ordersFeedClose,
  wsError: ordersFeedError,
  wsMessage: ordersFeedMessage,
};

const historyWebsocketMiddleware: Middleware =
  createSocketMiddleware<OrderDataBrief>(ordersHistoryActions);
const feedWebsocketMiddleware: Middleware =
  createSocketMiddleware<OrderDataBrief>(ordersFeedActions);

const preloadedState = {};

export const rootStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(historyWebsocketMiddleware)
      .concat(feedWebsocketMiddleware),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

// https://redux.js.org/usage/usage-with-typescript
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
