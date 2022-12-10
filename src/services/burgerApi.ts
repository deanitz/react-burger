import {
  GetIngredientsResponse,
  GetUserInfoResponseData,
  LoginRequest,
  OrderRequest,
  OrderResponseData,
  RefreshTokenResponseData,
  RegistrationRequest,
  RenewPasswordRequest,
  UpdateUserInfoRequest,
} from "../types/dataTypes";
import {
  ILimitedRequestInit,
  IResponseWithSuccess,
  Nullable,
} from "../types/utilityTypes";
import { getRefreshToken, storeTokens } from "../utils/localStorageUtils";

const API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  return await response.json();
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: ILimitedRequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      let refreshResult: RefreshTokenResponseData;

      try {
        refreshResult = await refreshTokenRequest();
        const { refreshToken, accessToken } = refreshResult;

        storeTokens({ refreshToken, accessToken });

        options.headers!["Authorization"] = accessToken;

        const res = await fetch(url, options);

        return await checkResponse(res);
      } catch (err: any) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(err);
    }
  }
};

export const refreshTokenRequest = (): Promise<RefreshTokenResponseData> => {
  const params = {
    token: getRefreshToken(),
  };
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => checkResponse(res));
};

export const getIngredients = (): Promise<GetIngredientsResponse> => {
  return fetch(`${API_URL}/ingredients`).then((res) => checkResponse(res));
};

export const placeOrder = (
  order: OrderRequest,
  accessToken: Nullable<string>
): Promise<IResponseWithSuccess & OrderResponseData> => {
  return fetchWithRefresh(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
};

export const resetPassword = (email: string): Promise<IResponseWithSuccess> => {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  }).then((res) => checkResponse(res));
};

export const renewPassword = (
  params: RenewPasswordRequest
): Promise<IResponseWithSuccess> => {
  return fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => checkResponse(res));
};

export const register = (
  params: RegistrationRequest
): Promise<IResponseWithSuccess & RefreshTokenResponseData> => {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => checkResponse(res));
};

export const login = (
  params: LoginRequest
): Promise<IResponseWithSuccess & RefreshTokenResponseData> => {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => checkResponse(res));
};

export const logout = (params: {
  token: Nullable<string>;
}): Promise<IResponseWithSuccess> => {
  return fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => checkResponse(res));
};

export const getUserInfo = (
  accessToken: Nullable<string>
): Promise<IResponseWithSuccess & GetUserInfoResponseData> => {
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
): Promise<IResponseWithSuccess> => {
  return fetchWithRefresh(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(params),
  });
};
