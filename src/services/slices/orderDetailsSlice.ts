import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { OrderData, OrdersMessageData } from "../../types/dataTypes";
import { storeOrders as storeOrdersInLocalStorage } from "../../utils/localStorageUtils";

interface IOrderDetailsState {
  orderData?: OrderData;
}

const initialState: IOrderDetailsState = {
  orderData: undefined,
};

export const storeOrders = createAsyncThunk(
  "orderData/storeOrders",
  (data: OrdersMessageData) => {
    storeOrdersInLocalStorage(data);
  }
);

const orderDataSlice = createSlice({
  name: "orderData",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderData | undefined>) => {
      state.orderData = action.payload;
    },
  },
});

export const { setOrder } = orderDataSlice.actions;

export default orderDataSlice.reducer;
