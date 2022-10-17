import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  selectedIngredientIds: [],
};

const selectedIngredientsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    addSelectedIngredient: (state, action) => ({
      ...state,
      selectedIngredientIds: [action.payload, ...state.selectedIngredientIds],
    }),
    removeSelectedIngredient: (state, action) => ({
      ...state,
      selectedIngredientIds: state.selectedIngredientIds.filter(
        (id) => id !== action.payload
      ),
    }),
    updateSelectedIngredients: (state, action) => {
      const filteredIds = state.selectedIngredientIds.filter(
        (id) => id !== action.payload.id
      );
      const completeIds = filteredIds.splice(
        action.payload.index,
        0,
        action.payload.id
      );
      return {
        ...state,
        selectedIngredientIds: completeIds,
      };
    },
  },
});

export const {
  addSelectedIngredient,
  removeSelectedIngredient,
  updateSelectedIngredients,
} = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
