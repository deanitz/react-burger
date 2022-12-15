import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderData } from "../../types/dataTypes";

interface IOrderDetailsState {
  orderData?: OrderData;
  isOrderLoaded: boolean;
}

export const initialState: IOrderDetailsState = {
  orderData: undefined,
  isOrderLoaded: false,
};

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
