import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginRequest, RegistrationRequest } from "../../types/dataTypes";
import { Nullable } from "../../types/utilityTypes";
import {
  getRefreshToken,
  removeTokens,
  storeTokens,
} from "../../utils/localStorageUtils";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
} from "../burgerApi";
import { logError } from "../logService";

interface ILoginState {
  login: {
    success: Nullable<boolean>;
    loading: boolean;
    error: boolean;
  };
  logout: {
    success: Nullable<boolean>;
    loading: boolean;
    error: boolean;
  };
  register: {
    success: Nullable<boolean>;
    loading: boolean;
    error: boolean;
  };
}

export const initialState: ILoginState = {
  login: {
    success: null,
    loading: false,
    error: false,
  },
  logout: {
    success: null,
    loading: false,
    error: false,
  },
  register: {
    success: null,
    loading: false,
    error: false,
  },
};

export const login = createAsyncThunk("auth/login", (params: LoginRequest) => {
  return apiLogin(params)
    .then((response) => {
      storeTokens(response);
      return response;
    })
    .catch((error) => {
      logError(error);
      throw error;
    });
});

export const logout = createAsyncThunk("auth/logout", () => {
  const params = {
    token: getRefreshToken(),
  };
  return apiLogout(params)
    .then((response) => {
      removeTokens();
      return response;
    })
    .catch((error) => {
      removeTokens();
      logError(error);
      throw error;
    });
});

export const register = createAsyncThunk(
  "auth/register",
  (params: RegistrationRequest) => {
    return apiRegister(params)
      .then((response) => {
        storeTokens(response);
        return response;
      })
      .catch((error) => {
        logError(error);
        throw error;
      });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLogin: (state) => {
      state.login = initialState.login;
    },
    resetLogout: (state) => {
      state.logout = initialState.logout;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.login.loading = true;
      state.login.error = false;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.login.loading = false;
      state.login.success = payload.success;
      state.login.error = !payload.success;
    });
    builder.addCase(login.rejected, (state) => {
      state.login.loading = false;
      state.login.success = initialState.login.success;
      state.login.error = true;
    });

    builder.addCase(logout.pending, (state) => {
      state.logout.success = initialState.logout.success;
      state.logout.loading = true;
      state.logout.error = false;
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.logout.loading = false;
      state.logout.success = payload.success;
      state.logout.error = !payload.success;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logout.loading = false;
      state.logout.success = initialState.logout.success;
      state.logout.error = true;
    });

    builder.addCase(register.pending, (state) => {
      state.register.loading = true;
      state.register.error = false;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.register.loading = false;
      state.register.success = payload.success;
      state.register.error = !payload.success;
    });
    builder.addCase(register.rejected, (state) => {
      state.register.loading = false;
      state.register.success = initialState.register.success;
      state.register.error = true;
    });
  },
});

export const { resetLogin, resetLogout } = authSlice.actions;

export default authSlice.reducer;
