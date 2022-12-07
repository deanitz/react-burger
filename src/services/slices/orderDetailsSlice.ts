import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { OrderData, OrdersMessageData } from "../../types/dataTypes";
import { storeOrders as storeOrdersInLocalStorage } from "../../utils/localStorageUtils";

interface IOrderDetailsState {
  orderData?: OrderData;
  isOrderLoaded: boolean;
}

const initialState: IOrderDetailsState = {
  orderData: undefined,
  isOrderLoaded: false,
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
      state.isOrderLoaded = true;
    },
    resetOrder: (state) => {
      state.orderData = initialState.orderData;
      state.isOrderLoaded = initialState.isOrderLoaded;
    },
  },
});

export const { setOrder, resetOrder } = orderDataSlice.actions;

export default orderDataSlice.reducer;
