import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrder } from "../../services/burgerApi";

export const initialState = {
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
  reducers: {},
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
      state.orderInfoLoading = false;
      state.orderInfoError = true;
    },
  },
});

export default orderSlice.reducer;
