import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Nullable } from "../../types/utilityTypes";

interface ISelectedIngredientsTabState {
  value: Nullable<string>;
}

const initialState: ISelectedIngredientsTabState = {
  value: null,
};

const selectedIngredientsTabSlice = createSlice({
  name: "selectedIngredientsTab",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedTab } = selectedIngredientsTabSlice.actions;

export default selectedIngredientsTabSlice.reducer;
