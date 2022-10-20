import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrder } from "../burgerApi";

const initialState = {
  orderInfo: null,
  orderInfoLoading: false,
  orderInfoError: false,
};

export const getOrderInfo = createAsyncThunk(
  "order/getOrderInfo",
  async (order) => {
    const response = await placeOrder(order);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderInfo: () => initialState,
  },
  extraReducers: {
    [getOrderInfo.pending]: (state) => {
      state.orderInfoLoading = true;
      state.orderInfoError = false;
    },
    [getOrderInfo.fulfilled]: (state, { payload }) => {
      state.orderInfoLoading = false;
      state.orderInfoError = false;
      state.orderInfo = payload;
    },
    [getOrderInfo.rejected]: (state) => {
      state.orderInfo = initialState.orderInfo;
      state.orderInfoLoading = false;
      state.orderInfoError = true;
    },
  },
});

export const { resetOrderInfo } = orderSlice.actions;

export default orderSlice.reducer;
