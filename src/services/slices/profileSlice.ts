import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserInfoResponseData, UpdateUserInfoRequest } from "../../types/dataTypes";
import { Nullable } from "../../types/utilityTypes";
import { getAccessToken } from "../../utils/localStorageUtils";
import {
  getUserInfo as apiGetUserInfo,
  updateUserInfo as apiUpdateUserInfo,
} from "../burgerApi";
import { logError } from "../logService";

interface IProfileState {
  getUserInfo: {
    info: Nullable<GetUserInfoResponseData>;
    loading: boolean;
    error: boolean;
  };
  updateUserInfo: {
    success: Nullable<boolean>;
    loading: boolean;
    error: boolean;
  };
}

const initialState: IProfileState = {
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
  (params: UpdateUserInfoRequest) => {
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
      state.getUserInfo = initialState.getUserInfo;
    },
    resetUpdateUserInfo: (state) => {
      state.updateUserInfo = initialState.updateUserInfo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.getUserInfo.loading = true;
      state.getUserInfo.error = false;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.getUserInfo.loading = false;
      state.getUserInfo.info = payload.success
        ? payload.user
        : initialState.getUserInfo.info;
      state.getUserInfo.error = !payload.success;
    });
    builder.addCase(getUserInfo.rejected, (state) => {
      state.getUserInfo.loading = false;
      state.getUserInfo.info = initialState.getUserInfo.info;
      state.getUserInfo.error = true;
    });

    builder.addCase(updateUserInfo.pending, (state) => {
      state.updateUserInfo.success = initialState.updateUserInfo.success;
      state.updateUserInfo.loading = true;
      state.updateUserInfo.error = false;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
      state.updateUserInfo.loading = false;
      state.updateUserInfo.success = payload.success;
      state.updateUserInfo.error = !payload.success;
    });
    builder.addCase(updateUserInfo.rejected, (state) => {
      state.updateUserInfo.loading = false;
      state.updateUserInfo.success = initialState.updateUserInfo.success;
      state.updateUserInfo.error = true;
    });
  },
});

export const { resetGetUserInfo, resetUpdateUserInfo } = profileSlice.actions;

export default profileSlice.reducer;
