import { createSlice } from "@reduxjs/toolkit";

interface ISelectedIngredientsTabState {
  value: string | null;
}

const initialState: ISelectedIngredientsTabState = {
  value: null,
};

const selectedIngredientsTabSlice = createSlice({
  name: "selectedIngredientsTab",
  initialState,
  reducers: {
    setSelectedTab: (state, action: { payload: string }) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedTab } = selectedIngredientsTabSlice.actions;

export default selectedIngredientsTabSlice.reducer;
