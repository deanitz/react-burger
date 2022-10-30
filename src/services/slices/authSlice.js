import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRefreshToken,
  removeTokens,
  storeTokens,
} from "../../utils/localStorageUtils";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  token as apiToken,
} from "../burgerApi";
import { logError } from "../logService";

const initialState = {
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
  token: {
    success: null,
    loading: false,
    error: false,
  },
  user: {
    info: null,
    loading: false,
    error: false,
  },
};

export const login = createAsyncThunk("auth/login", (params) => {
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
      logError(error);
      throw error;
    });
});

export const register = createAsyncThunk("auth/register", (params) => {
  return apiRegister(params)
    .then((response) => {
      storeTokens(response);
      return response;
    })
    .catch((error) => {
      logError(error);
      throw error;
    });
});

export const token = createAsyncThunk("auth/token", (params) => {
  return apiToken(params)
    .then((response) => {
      storeTokens(response);
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
    resetLogin: (state) => {
      state.login = initialState.login;
    },
    resetLogout: (state) => {
      state.logout = initialState.logout;
    },
    resetRegister: (state) => {
      state.register = initialState.register;
    },
    resetToken: (state) => {
      state.token = initialState.token;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.login.loading = true;
      state.login.error = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.login.loading = false;
      state.login.success = payload.success;
      state.login.error = !payload.success;
    },
    [login.rejected]: (state) => {
      state.login.loading = false;
      state.login.success = initialState.login.success;
      state.login.error = true;
    },
    [logout.pending]: (state) => {
      state.logout.loading = true;
      state.logout.error = false;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.logout.loading = false;
      state.logout.success = payload.success;
      state.logout.error = !payload.success;
    },
    [logout.rejected]: (state) => {
      state.logout.loading = false;
      state.logout.success = initialState.logout.success;
      state.logout.error = true;
    },
    [register.pending]: (state) => {
      state.register.loading = true;
      state.register.error = false;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.register.loading = false;
      state.register.success = payload.success;
      state.register.error = !payload.success;
    },
    [register.rejected]: (state) => {
      state.register.loading = false;
      state.register.success = initialState.register.success;
      state.register.error = true;
    },
    [token.pending]: (state) => {
      state.token.loading = true;
      state.token.error = false;
    },
    [token.fulfilled]: (state, { payload }) => {
      state.token.loading = false;
      state.token.success = payload.success;
      state.token.error = !payload.success;
    },
    [token.rejected]: (state) => {
      state.token.loading = false;
      state.token.success = initialState.token.success;
      state.token.error = true;
    },
  },
});

export const { resetLogin, resetLogout, resetRegister, resetToken } =
  authSlice.actions;

export default authSlice.reducer;
