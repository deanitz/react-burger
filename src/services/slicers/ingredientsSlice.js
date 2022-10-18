import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../../services/burgerApi";

const initialState = {
  ingredientsData: [],
  ingredientsDataLoading: false,
  ingredientsDataError: false,
  displayedIngredient: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (order) => {
    const response = await getIngredients(order);
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setDisplayedIngredient: (state, action) => ({
      ...state,
      displayedIngredient: action.payload,
    }),
    resetDisplayedIngredient: (state) => ({
      ...state,
      displayedIngredient: null,
    }),
  },
  extraReducers: {
    [fetchIngredients.pending]: (state) => {
      state.ingredientsDataLoading = true;
      state.ingredientsDataError = false;
    },
    [fetchIngredients.fulfilled]: (state, { payload }) => {
      state.ingredientsDataLoading = false;
      state.ingredientsDataError = false;
      state.ingredientsData = payload.data;
    },
    [fetchIngredients.rejected]: (state) => {
      state.ingredientsDataLoading = false;
      state.ingredientsDataError = true;
    },
  },
});

export const { setDisplayedIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
