import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  ingredientsData: [],
  displayedIngredient: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    fetchIngredients: (state, action) => ({
      ...state,
      ingredientsData: action.payload,
    }),
    setDisplayedIngredient: (state, action) => ({
      ...state,
      displayedIngredient: action.payload,
    }),
  },
});

export const { fetchIngredients, setDisplayedIngredient } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
