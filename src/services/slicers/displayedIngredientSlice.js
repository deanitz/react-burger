import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const displayedIngredientSlice = createSlice({
  name: "displayedIngredient",
  initialState,
  reducers: {
    setDisplayedIngredient: (state, action) => {
      state.value = action.payload;
    },
    resetDisplayedIngredient: (state) => {
      state.value = null;
    },
  },
});

export const { setDisplayedIngredient, resetDisplayedIngredient } =
  displayedIngredientSlice.actions;

export default displayedIngredientSlice.reducer;
