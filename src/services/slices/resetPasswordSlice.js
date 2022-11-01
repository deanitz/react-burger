import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  resetPassword as apiResetPassword,
  renewPassword as apiRenewPassword,
} from "../burgerApi";
import { logError } from "../logService";

const initialState = {
  reset: {
    success: null,
    loading: false,
    error: false,
  },
  renew: {
    success: null,
    loading: false,
    error: false,
  },
};

export const reset = createAsyncThunk("resetPassword/reset", (email) => {
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
});

export const renew = createAsyncThunk("resetPassword/renew", (email) => {
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
});

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: {
    [reset.pending]: (state) => {
      state.reset.success = false;
      state.reset.loading = true;
      state.reset.error = false;
    },
    [reset.fulfilled]: (state, { payload }) => {
      state.reset.loading = false;
      state.reset.success = payload.success;
      state.reset.error = !payload.success;
    },
    [reset.rejected]: (state) => {
      state.reset.loading = false;
      state.reset.success = false;
      state.reset.error = true;
    },
    [renew.pending]: (state) => {
      state.renew.success = false;
      state.renew.loading = true;
      state.renew.error = false;
    },
    [renew.fulfilled]: (state, { payload }) => {
      state.renew.loading = false;
      state.renew.success = payload.success;
      state.renew.error = !payload.success;
    },
    [renew.rejected]: (state) => {
      state.renew.loading = false;
      state.renew.success = false;
      state.renew.error = true;
    },
  },
});

export const { resetState } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
