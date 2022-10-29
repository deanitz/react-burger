import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  resetPassword as apiResetPassword,
  renewPassword as apiRenewPassword,
} from "../burgerApi";
import { logError } from "../logService";

const initialState = {
  resetPasswordSuccess: null,
  resetPasswordLoading: false,
  resetPasswordError: false,
  renewPasswordSuccess: null,
  renewPasswordLoading: false,
  renewPasswordError: false,
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

export const renewPassword = createAsyncThunk(
  "resetPassword/renewPassword",
  (email) => {
    return apiRenewPassword({
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
    [renewPassword.pending]: (state) => {
      state.renewPasswordLoading = true;
      state.renewPasswordError = false;
    },
    [renewPassword.fulfilled]: (state, { payload }) => {
      state.renewPasswordLoading = false;
      state.renewPasswordSuccess = payload.success;
      state.renewPasswordError = !payload.success;
    },
    [renewPassword.rejected]: (state) => {
      state.renewPasswordLoading = false;
      state.renewPasswordSuccess = false;
      state.renewPasswordError = true;
    },
  },
});

export const { resetState } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
