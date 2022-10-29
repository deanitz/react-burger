import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as apiLogin } from "../burgerApi";
import { logError } from "../logService";

const initialState = {
  loginInfo: null,
  loginLoading: false,
  loginError: false,
};

export const login = createAsyncThunk("auth/login", (params) => {
  return apiLogin({
    params,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      logError(error);
      throw error;
    });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loginLoading = true;
      state.logError = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loginLoading = false;
      state.loginInfo = payload;
      state.loginError = !payload.success;
    },
    [login.rejected]: (state) => {
      state.loginLoading = false;
      state.loginInfo = initialState.loginInfo;
      state.loginError = true;
    },
  },
});

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
