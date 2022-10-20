import { createSlice } from "@reduxjs/toolkit";
import { addUniqueId } from "../../utils/dataUtils";

const initialState = {
  selectedIngredients: {
    bun: null,
    inner: [],
  },
};

const selectedIngredientsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    setSelectedIngredients: (state, action) => {
      state.selectedIngredients = action.payload;
    },
    setBun: (state, action) => {
      state.selectedIngredients.bun = action.payload;
    },
    addSelectedIngredient: (state, action) => {
      const uniqueItem = addUniqueId(action.payload);
      state.selectedIngredients.inner.unshift(uniqueItem);
    },
    removeSelectedIngredient: (state, action) => {
      state.selectedIngredients.inner = state.selectedIngredients.inner.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
    },
    reorderSelectedIngredients: (state, action) => {
      const { draggedIngredient, staticIngredient } = action.payload;

      const isDraggingDown =
        state.selectedIngredients.inner.findIndex(
          (ingredient) => ingredient.uniqueId === draggedIngredient.uniqueId
        ) <
        state.selectedIngredients.inner.findIndex(
          (ingredient) => ingredient.uniqueId === staticIngredient.uniqueId
        );

      const filtered = state.selectedIngredients.inner.filter(
        (ingredient) => ingredient.uniqueId !== draggedIngredient.uniqueId
      );
      const index = filtered.findIndex(
        (ingredient) => ingredient.uniqueId === staticIngredient.uniqueId
      );

      filtered.splice(isDraggingDown ? index + 1 : index, 0, draggedIngredient);
      state.selectedIngredients.inner = filtered;
      console.log("complete", state.selectedIngredients.inner);
    },
  },
});

export const {
  setSelectedIngredients,
  addSelectedIngredient,
  removeSelectedIngredient,
  reorderSelectedIngredients,
  setBun,
} = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
