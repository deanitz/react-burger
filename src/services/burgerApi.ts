import {
  LoginRequest,
  OrderRequest,
  RegistrationRequest,
  RenewPasswordRequest,
  UpdateUserInfoRequest,
} from "../types/dataTypes";
import { ILimitedRequestInit, Nullable } from "../types/utilityTypes";
import { getRefreshToken, storeTokens } from "../utils/localStorageUtils";

const API_URL = "https://norma.nomoreparties.space/api";

//TODO generic
const checkResponse = (response: Response) => {
  return response.ok
    ? response.json()
    : response.json().then((error) => Promise.reject(error));
};

export const fetchWithRefresh = async (
  url: string,
  options: ILimitedRequestInit
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const { refreshToken, accessToken } = await refreshTokenRequest();

      storeTokens({ refreshToken, accessToken });

      options.headers!["Authorization"] = accessToken;

      const res = await fetch(url, options);

      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const refreshTokenRequest = () => {
  const params = {
    token: getRefreshToken(),
  };
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(checkResponse);
};

//TODO return types!
export const getIngredients = () => {
  return fetch(`${API_URL}/ingredients`).then(checkResponse);
};

export const placeOrder = (order: OrderRequest) => {
  return fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  }).then(checkResponse);
};

export const resetPassword = (email: string) => {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  }).then(checkResponse);
};

export const renewPassword = (params: RenewPasswordRequest) => {
  return fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(checkResponse);
};

export const register = (params: RegistrationRequest) => {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(checkResponse);
};

export const login = (params: LoginRequest) => {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(checkResponse);
};

export const logout = (params: { token: Nullable<string> }) => {
  return fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(checkResponse);
};

export const getUserInfo = (accessToken: Nullable<string>) => {
  return fetchWithRefresh(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

export const updateUserInfo = (
  params: UpdateUserInfoRequest,
  accessToken: Nullable<string>
) => {
  return fetchWithRefresh(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(params),
  });
};
