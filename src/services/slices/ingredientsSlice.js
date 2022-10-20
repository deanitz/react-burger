import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../burgerApi";
import { logError } from "../logService";

const initialState = {
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
      console.log("rejected handled!");
      state.ingredientsData = initialState.ingredientsData;
      state.ingredientsDataLoading = false;
      state.ingredientsDataError = true;
    },
  },
});

export default ingredientsSlice.reducer;
