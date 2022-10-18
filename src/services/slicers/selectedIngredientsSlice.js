import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIngredientsIds: [],
};

const selectedIngredientsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    setSelectedIngredients: (state, action) => {
      state.selectedIngredientsIds = action.payload;
    },
    addSelectedIngredient: (state, action) => ({
      ...state,
      selectedIngredientsIds: [action.payload, ...state.selectedIngredientsIds],
    }),
    removeSelectedIngredient: (state, action) => ({
      ...state,
      selectedIngredientsIds: state.selectedIngredientsIds.filter(
        (id) => id !== action.payload
      ),
    }),
    updateSelectedIngredients: (state, action) => {
      const filteredIds = state.selectedIngredientsIds.filter(
        (id) => id !== action.payload.id
      );
      const completeIds = filteredIds.splice(
        action.payload.index,
        0,
        action.payload.id
      );
      return {
        ...state,
        selectedIngredientsIds: completeIds,
      };
    },
  },
});

export const {
  setSelectedIngredients,
  addSelectedIngredient,
  removeSelectedIngredient,
  updateSelectedIngredients,
} = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
