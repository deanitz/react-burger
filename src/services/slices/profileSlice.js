import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "../../utils/localStorageUtils";
import {
  getUserInfo as apiGetUserInfo,
  updateUserInfo as apiUpdateUserInfo,
} from "../burgerApi";
import { logError } from "../logService";

const initialState = {
  getUserInfo: {
    info: null,
    loading: false,
    error: false,
  },
  updateUserInfo: {
    success: null,
    loading: false,
    error: false,
  },
};

export const getUserInfo = createAsyncThunk("profile/getUserInfo", () => {
  const accessToken = getAccessToken();
  return apiGetUserInfo(accessToken)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      logError(error);
      throw error;
    });
});

export const updateUserInfo = createAsyncThunk(
  "profile/updateUserInfo",
  (params) => {
    const accessToken = getAccessToken();
    return apiUpdateUserInfo(params, accessToken)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        logError(error);
        throw error;
      });
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetGetUserInfo: (state) => {
      state.login = initialState.login;
    },
    resetUpdateUserInfo: (state) => {
      state.logout = initialState.logout;
    },
  },
  extraReducers: {
    [getUserInfo.pending]: (state) => {
      state.getUserInfo.loading = true;
      state.getUserInfo.error = false;
    },
    [getUserInfo.fulfilled]: (state, { payload }) => {
      state.getUserInfo.loading = false;
      state.getUserInfo.info = payload.success
        ? payload.user
        : initialState.getUserInfo.info;
      state.getUserInfo.error = !payload.success;
    },
    [getUserInfo.rejected]: (state) => {
      state.getUserInfo.loading = false;
      state.getUserInfo.success = initialState.getUserInfo.success;
      state.getUserInfo.error = true;
    },
    [updateUserInfo.pending]: (state) => {
      state.updateUserInfo.loading = true;
      state.updateUserInfo.error = false;
    },
    [updateUserInfo.fulfilled]: (state, { payload }) => {
      state.updateUserInfo.loading = false;
      state.updateUserInfo.success = payload.success;
      state.updateUserInfo.error = !payload.success;
    },
    [updateUserInfo.rejected]: (state) => {
      state.updateUserInfo.loading = false;
      state.updateUserInfo.success = initialState.updateUserInfo.success;
      state.updateUserInfo.error = true;
    },
  },
});

export const { resetGetUserInfo, resetUpdateUserInfo } = profileSlice.actions;

export default profileSlice.reducer;
