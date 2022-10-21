import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrder } from "../burgerApi";
import { logError } from "../logService";

const initialState = {
  orderInfo: null,
  orderInfoLoading: false,
  orderInfoError: false,
};

export const getOrderInfo = createAsyncThunk("order/getOrderInfo", (order) => {
  return placeOrder(order)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      logError(error);
      throw error;
    });
});

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
