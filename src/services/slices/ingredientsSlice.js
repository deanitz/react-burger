import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../burgerApi";

const initialState = {
  ingredientsData: [],
  ingredientsDataLoading: false,
  ingredientsDataError: false,
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
  reducers: {},
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
      state.ingredientsData = initialState.ingredientsData;
      state.ingredientsDataLoading = false;
      state.ingredientsDataError = true;
    },
  },
});

export default ingredientsSlice.reducer;
