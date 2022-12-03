import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../types/utilityTypes";

interface IOrdersFeedState {
  status: WebsocketStatus;
  connectionError: string;
  orders: Array<any>;
}

const initialState: IOrdersFeedState = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  orders: [],
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
    wsMessage: (state, action: PayloadAction<any>) => {
      state.orders = action.payload;
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
