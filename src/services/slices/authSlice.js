import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  token as apiToken,
 } from "../burgerApi";
import { logError } from "../logService";

const initialState = {
  login: {
    info: null,
    loading: false,
    error: false,
  },
  logout: {
    info: null,
    loading: false,
    error: false,
  },
  register: {
    info: null,
    loading: false,
    error: false,
  },
  token: {
    info: null,
    loading: false,
    error: false,
  },
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

export const logout = createAsyncThunk("auth/logout", (params) => {
  return apiLogout({
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

export const register = createAsyncThunk("auth/register", (params) => {
  return apiRegister({
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

export const token = createAsyncThunk("auth/token", (params) => {
  return apiToken({
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
      state.login.info = payload.success ? payload : initialState.login.info;
      state.login.error = !payload.success;
    },
    [login.rejected]: (state) => {
      state.login.loading = false;
      state.login.info = initialState.login.info;
      state.login.error = true;
    },
    [logout.pending]: (state) => {
      state.logout.loading = true;
      state.logout.error = false;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.logout.loading = false;
      state.logout.info = payload.success ? payload : initialState.logout.info;
      state.logout.error = !payload.success;
    },
    [logout.rejected]: (state) => {
      state.logout.loading = false;
      state.logout.info = initialState.logout.info;
      state.logout.error = true;
    },
    [register.pending]: (state) => {
      state.register.loading = true;
      state.register.error = false;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.register.loading = false;
      state.register.info = payload.success ? payload : initialState.register.info;
      state.register.error = !payload.success;
    },
    [register.rejected]: (state) => {
      state.register.loading = false;
      state.register.info = initialState.register.info;
      state.register.error = true;
    },
    [token.pending]: (state) => {
      state.token.loading = true;
      state.token.error = false;
    },
    [token.fulfilled]: (state, { payload }) => {
      state.token.loading = false;
      state.token.info = payload.success ? payload : initialState.token.info;
      state.token.error = !payload.success;
    },
    [token.rejected]: (state) => {
      state.token.loading = false;
      state.token.info = initialState.token.info;
      state.token.error = true;
    },
  },
});

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
