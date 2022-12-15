import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderData, OrdersMessageData } from "../../types/dataTypes";
import { WebsocketStatus } from "../../types/utilityTypes";

interface IOrdersFeedState {
  status: WebsocketStatus;
  connectionError: string;
  orders: Array<OrderData>;
  total: number;
  totalToday: number;
}

export const initialState: IOrdersFeedState = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  orders: [],
  total: 0,
  totalToday: 0,
};

const ordersFeedSlice = createSlice({
  name: "ordersFeed",
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state, action: PayloadAction<OrdersMessageData>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  ordersFeedSlice.actions;

export const connect = createAction<string, "ORDERS_FEED_CONNECT">(
  "ORDERS_FEED_CONNECT"
);
export const disconnect = createAction("ORDERS_FEED_DISCONNECT");

export default ordersFeedSlice.reducer;
