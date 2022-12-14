import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient, IngredientShape } from "../../types/dataTypes";
import { Nullable } from "../../types/utilityTypes";
import { addUniqueId } from "../../utils/dataUtils";

interface ISelectedIngredientsState {
  bun: Nullable<Ingredient>;
  inner: Ingredient[];
}

export const initialState: ISelectedIngredientsState = {
  bun: null,
  inner: [],
};

const selectedIngredientsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    reset: (state) => {
      state.bun = initialState.bun;
      state.inner = initialState.inner;
    },
    setBun: (state, action: PayloadAction<Ingredient>) => {
      state.bun = action.payload;
    },
    addSelectedIngredient: (state, action: PayloadAction<IngredientShape>) => {
      const uniqueItem = addUniqueId(action.payload);
      state.inner.unshift(uniqueItem);
    },
    removeSelectedIngredient: (state, action: PayloadAction<string>) => {
      state.inner = state.inner.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
    },
    reorderSelectedIngredients: (
      state,
      action: PayloadAction<{
        draggedIngredient: Ingredient;
        staticIngredient: Ingredient;
      }>
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
  reset,
  addSelectedIngredient,
  removeSelectedIngredient,
  reorderSelectedIngredients,
  setBun,
} = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
