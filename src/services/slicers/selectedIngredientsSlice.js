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
      console.log("setBun item", action.payload);
      state.selectedIngredients.bun = action.payload;
    },
    addSelectedIngredient: (state, action) => {
      const uniqueItem = addUniqueId(action.payload);
      state.selectedIngredients.inner.push(uniqueItem);
    },
    removeSelectedIngredient: (state, action) => {
      state.selectedIngredients.inner = state.selectedIngredients.inner.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
    },
    updateSelectedIngredients: (state, action) => {
      const filtered = state.selectedIngredients.filter(
        (ingredient) => ingredient.uniqueId !== action.payload.item.uniqueId
      );
      const complete = filtered.splice(
        action.payload.index,
        0,
        action.payload.item.uniqueId
      );
      return {
        ...state,
        selectedIngredients: complete,
      };
    },
  },
});

export const {
  setSelectedIngredients,
  addSelectedIngredient,
  removeSelectedIngredient,
  updateSelectedIngredients,
  setBun,
} = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
