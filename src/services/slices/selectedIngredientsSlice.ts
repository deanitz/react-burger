import { createSlice } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/dataShape";
import { addUniqueId } from "../../utils/dataUtils";

interface ISelectedIngredientsState {
  bun: Ingredient | null;
  inner: Ingredient[];
}

const initialState: ISelectedIngredientsState = {
  bun: null,
  inner: [],
};

const selectedIngredientsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    setBun: (state, action: { payload: Ingredient }) => {
      state.bun = action.payload;
    },
    addSelectedIngredient: (state, action: { payload: Ingredient }) => {
      const uniqueItem = addUniqueId(action.payload);
      state.inner.unshift(uniqueItem);
    },
    removeSelectedIngredient: (state, action: { payload: string }) => {
      state.inner = state.inner.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
    },
    reorderSelectedIngredients: (
      state,
      action: {
        payload: {
          draggedIngredient: Ingredient;
          staticIngredient: Ingredient;
        };
      }
    ) => {
      const { draggedIngredient, staticIngredient } = action.payload;

      const isDraggingDown =
        state.inner.findIndex(
          (ingredient) => ingredient.uniqueId === draggedIngredient.uniqueId
        ) <
        state.inner.findIndex(
          (ingredient) => ingredient.uniqueId === staticIngredient.uniqueId
        );

      const filtered = state.inner.filter(
        (ingredient) => ingredient.uniqueId !== draggedIngredient.uniqueId
      );
      const index = filtered.findIndex(
        (ingredient) => ingredient.uniqueId === staticIngredient.uniqueId
      );

      filtered.splice(isDraggingDown ? index + 1 : index, 0, draggedIngredient);
      state.inner = filtered;
    },
  },
});

export const {
  addSelectedIngredient,
  removeSelectedIngredient,
  reorderSelectedIngredients,
  setBun,
} = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
