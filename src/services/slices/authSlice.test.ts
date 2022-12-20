import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import reducer, {
  initialState,
  login,
  logout,
  register,
  resetLogin,
  resetLogout,
} from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";
import fetchMock from "jest-fetch-mock";
import { API_URL } from "../burgerApi";

const localStorageUtils = require("../../utils/localStorageUtils");
jest.mock("../../utils/localStorageUtils");

const logService = require("../logService");
jest.mock("../logService");

const initStore = initialState;

const loginUrl = `${API_URL}/auth/login`;
const logoutUrl = `${API_URL}/auth/logout`;
const registerUrl = `${API_URL}/auth/register`;

const loginRequest = {
  email: "test@test.test",
  password: "testPassword",
};

const registerRequest = {
  name: "testName",
  email: "test@test.test",
  password: "testPassword",
};

const testResponse = {
  success: true,
  refreshToken: "refreshToken",
  accessToken: "accessToken",
};

const logoutResponse = {
  success: true,
};

describe("Проверка authSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
      preloadedState: initStore,
    });

    localStorageUtils.storeTokens = jest.fn();
    localStorageUtils.removeTokens = jest.fn();
    logService.logError = jest.fn();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("На старте имеет изначальное значение", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
  });

  describe("Проверка login", () => {
    it("Сохраняет состояние login в state и токены в localStorage при успешном вызове", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(testResponse));

      const { getState } = store;

      await store.dispatch(login(loginRequest));

      expect(getState()).toMatchObject({
        login: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(localStorageUtils.storeTokens).toBeCalledWith(
        expect.objectContaining({
          accessToken: testResponse.accessToken,
          refreshToken: testResponse.refreshToken,
        })
      );
      expect(fetchMock).toBeCalledWith(loginUrl, expect.anything());
    });

    it("Задает состояние ошибки login в state и не обновляет токены в localStorage при ошибке", async () => {
      fetchMock.mockRejectOnce(new Error("Ошибка"));

      const { getState } = store;

      await store.dispatch(login(loginRequest));

      expect(getState()).toMatchObject({
        login: {
          success: null,
          loading: false,
          error: true,
        },
      });
      expect(localStorageUtils.storeTokens).not.toBeCalled();
      expect(fetchMock).toBeCalledWith(loginUrl, expect.anything());
    });

    it("Сбрасывает состояние login в state при вызове resetLogin", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(testResponse));

      const { getState } = store;

      await store.dispatch(login(loginRequest));

      expect(getState()).toMatchObject({
        login: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(localStorageUtils.storeTokens).toBeCalledWith(
        expect.objectContaining({
          accessToken: testResponse.accessToken,
          refreshToken: testResponse.refreshToken,
        })
      );
      expect(fetchMock).toBeCalledWith(loginUrl, expect.anything());

      await store.dispatch(resetLogin());

      expect(getState()).toMatchObject({
        login: {
          success: null,
          loading: false,
          error: false,
        },
      });
    });
  });

  describe("Проверка logout", () => {
    it("Сохраняет состояние logout в state и сбрасывает токены в localStorage при успешном вызове", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(logoutResponse));

      const { getState } = store;

      await store.dispatch(logout());

      expect(getState()).toMatchObject({
        logout: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(localStorageUtils.removeTokens).toBeCalled();
      expect(fetchMock).toBeCalledWith(logoutUrl, expect.anything());
    });

    it("Задает состояние ошибки logout в state и сбрасывает токены в localStorage при ошибке", async () => {
      fetchMock.mockRejectOnce(new Error("Ошибка"));

      const { getState } = store;

      await store.dispatch(logout());

      expect(getState()).toMatchObject({
        logout: {
          success: null,
          loading: false,
          error: true,
        },
      });
      expect(localStorageUtils.removeTokens).toBeCalled();
      expect(fetchMock).toBeCalledWith(logoutUrl, expect.anything());
    });

    it("Сбрасывает состояние logout в state при успешном вызове resetLogout", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(logoutResponse));

      const { getState } = store;

      await store.dispatch(logout());

      expect(getState()).toMatchObject({
        logout: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(localStorageUtils.removeTokens).toBeCalled();
      expect(fetchMock).toBeCalledWith(logoutUrl, expect.anything());

      await store.dispatch(resetLogout());

      expect(getState()).toMatchObject({
        logout: {
          success: null,
          loading: false,
          error: false,
        },
      });
    });
  });

  describe("Проверка register", () => {
    it("Сохраняет состояние register в state и токены в localStorage при успешном вызове", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(testResponse));

      const { getState } = store;

      await store.dispatch(register(registerRequest));

      expect(getState()).toMatchObject({
        register: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(localStorageUtils.storeTokens).toBeCalledWith(
        expect.objectContaining({
          accessToken: testResponse.accessToken,
          refreshToken: testResponse.refreshToken,
        })
      );
      expect(fetchMock).toBeCalledWith(registerUrl, expect.anything());
    });

    it("Задает состояние ошибки register в state и не обновляет токены в localStorage при ошибке", async () => {
      fetchMock.mockRejectOnce(new Error("Ошибка"));

      const { getState } = store;

      await store.dispatch(register(registerRequest));

      expect(getState()).toMatchObject({
        register: {
          success: null,
          loading: false,
          error: true,
        },
      });
      expect(localStorageUtils.storeTokens).not.toBeCalled();
      expect(fetchMock).toBeCalledWith(registerUrl, expect.anything());
    });
  });
});
