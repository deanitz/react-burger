import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Ingredient } from "../../types/dataTypes";
import { getIngredients } from "../burgerApi";
import { logError } from "../logService";

interface IIngredientsState {
  ingredientsData: Array<Ingredient>;
  ingredientsDataLoading: boolean;
  ingredientsDataError: boolean;
}

export const initialState: IIngredientsState = {
  ingredientsData: [],
  ingredientsDataLoading: false,
  ingredientsDataError: false,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  () => {
    return getIngredients()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        logError(error);
        throw error;
      });
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.ingredientsDataLoading = true;
      state.ingredientsDataError = false;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, { payload }) => {
      state.ingredientsDataLoading = false;
      state.ingredientsDataError = false;
      state.ingredientsData = payload.data;
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.ingredientsData = initialState.ingredientsData;
      state.ingredientsDataLoading = false;
      state.ingredientsDataError = true;
    });
  },
});

export default ingredientsSlice.reducer;
