import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderData, OrdersMessageData } from "../../types/dataTypes";
import { WebsocketStatus } from "../../types/utilityTypes";

interface IOrdersHistoryState {
  status: WebsocketStatus;
  connectionError: string;
  orders: Array<OrderData>;
}

const initialState: IOrdersHistoryState = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  orders: [],
};

const ordersHistorySlice = createSlice({
  name: "ordersHistory",
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
    },
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  ordersHistorySlice.actions;

export const connect = createAction<string, "ORDERS_HISTORY_CONNECT">(
  "ORDERS_HISTORY_CONNECT"
);
export const disconnect = createAction("ORDERS_HISTORY_DISCONNECT");

export default ordersHistorySlice.reducer;
