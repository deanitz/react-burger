import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const selectedIngredientsTabSlice = createSlice({
  name: "selectedIngredientsTab",
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedTab } = selectedIngredientsTabSlice.actions;

export default selectedIngredientsTabSlice.reducer;
