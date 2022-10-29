import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetPassword as apiResetPassword } from "../burgerApi";
import { logError } from "../logService";

const initialState = {
  resetPasswordSuccess: null,
  resetPasswordLoading: false,
  resetPasswordError: false,
};

export const resetPassword = createAsyncThunk(
  "resetPassword/resetPassword",
  (email) => {
    return apiResetPassword({
      email,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        logError(error);
        throw error;
      });
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    resetState: () => {
      console.log("resetState");
      return initialState;
    },
  },
  extraReducers: {
    [resetPassword.pending]: (state) => {
      state.resetPasswordLoading = true;
      state.resetPasswordError = false;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.resetPasswordLoading = false;
      state.resetPasswordSuccess = payload.success;
      state.resetPasswordError = !payload.success;
    },
    [resetPassword.rejected]: (state) => {
      state.resetPasswordLoading = false;
      state.resetPasswordSuccess = false;
      state.resetPasswordError = true;
    },
  },
});

export const { resetState } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
