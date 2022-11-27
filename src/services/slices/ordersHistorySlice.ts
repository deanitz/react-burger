import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IOrdersHistoryState {
  orders: Array<any>;
}

const initialState: IOrdersHistoryState = {
  orders: [],
};

const ordersHistorySlice = createSlice({
  name: "ordersHistory",
  initialState,
  reducers: {
    addOrdersHistory: (state, action: PayloadAction<any>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addOrdersHistory } = ordersHistorySlice.actions;

export default ordersHistorySlice.reducer;
