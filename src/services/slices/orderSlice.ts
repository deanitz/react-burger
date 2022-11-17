import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  OrderRequest,
  OrderData,
  OrderResponseData,
} from "../../types/dataTypes";
import { IResponseWithSuccess, Nullable } from "../../types/utilityTypes";
import { placeOrder } from "../burgerApi";
import { logError } from "../logService";

interface IOrderState {
  orderInfo: Nullable<OrderData>;
  orderInfoLoading: boolean;
  orderInfoError: boolean;
}

const initialState: IOrderState = {
  orderInfo: null,
  orderInfoLoading: false,
  orderInfoError: false,
};

export const getOrderInfo = createAsyncThunk(
  "order/getOrderInfo",
  (order: OrderRequest) => {
    return placeOrder(order)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        logError(error);
        throw error;
      });
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderInfo: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderInfo.pending, (state) => {
      state.orderInfoLoading = true;
      state.orderInfoError = false;
    });
    builder.addCase(
      getOrderInfo.fulfilled,
      (
        state,
        { payload }: PayloadAction<IResponseWithSuccess & OrderResponseData>
      ) => {
        state.orderInfoLoading = false;
        state.orderInfoError = !payload.success;
        state.orderInfo = payload.success
          ? {
              name: payload.name,
              number: payload.order.number,
            }
          : initialState.orderInfo;
      }
    );
    builder.addCase(getOrderInfo.rejected, (state) => {
      state.orderInfo = initialState.orderInfo;
      state.orderInfoLoading = false;
      state.orderInfoError = true;
    });
  },
});

export const { resetOrderInfo } = orderSlice.actions;

export default orderSlice.reducer;
