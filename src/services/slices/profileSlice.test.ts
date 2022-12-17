import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import reducer, {
  initialState,
  getUserInfo,
  updateUserInfo,
  resetGetUserInfo,
  resetUpdateUserInfo,
} from "./profileSlice";
import { configureStore } from "@reduxjs/toolkit";
import fetchMock from "jest-fetch-mock";
import { API_URL } from "../burgerApi";

const localStorageUtils = require("../../utils/localStorageUtils");
jest.mock("../../utils/localStorageUtils");

const logService = require("../logService");
jest.mock("../logService");

const initStore = initialState;

const getUserInfoUrl = `${API_URL}/auth/user`;
const updateUserInfoUrl = `${API_URL}/auth/user`;

const updateUserInfoRequest = {
  name: "testName",
  email: "test@test.test",
  password: "testPassword",
};

const testUserInfo = {
  name: "testUserName",
  email: "test@test.test",
};

const getUserInfoResponse = {
  success: true,
  user: testUserInfo,
};

const updateUserInfoResponse = {
  success: true,
};

describe("Проверка authSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
      preloadedState: initStore,
    });

    localStorageUtils.getAccessToken = jest.fn();
    logService.logError = jest.fn();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("На старте имеет изначальное значение", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
  });

  describe("Проверка getUserInfo", () => {
    it("Сохраняет состояние getUserInfo в state", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getUserInfoResponse));

      const { getState } = store;

      await store.dispatch(getUserInfo());

      expect(getState()).toMatchObject({
        getUserInfo: {
          info: testUserInfo,
          loading: false,
          error: false,
        },
      });
      expect(localStorageUtils.getAccessToken).toBeCalled();
      expect(fetchMock).toBeCalledWith(getUserInfoUrl, expect.anything());
    });

    it("Задает состояние ошибки getUserInfo в state при ошибке", async () => {
      fetchMock.mockRejectOnce(new Error("Ошибка"));

      const { getState } = store;

      await store.dispatch(getUserInfo());

      expect(getState()).toMatchObject({
        getUserInfo: {
          info: null,
          loading: false,
          error: true,
        },
      });
      expect(localStorageUtils.getAccessToken).toBeCalled();
      expect(fetchMock).toBeCalledWith(getUserInfoUrl, expect.anything());
    });

    it("Сбрасывает состояние getUserInfo в state при вызове resetGetUserInfo", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getUserInfoResponse));

      const { getState } = store;

      await store.dispatch(getUserInfo());

      expect(getState()).toMatchObject({
        getUserInfo: {
          info: testUserInfo,
          loading: false,
          error: false,
        },
      });
      expect(localStorageUtils.getAccessToken).toBeCalled();
      expect(fetchMock).toBeCalledWith(getUserInfoUrl, expect.anything());

      await store.dispatch(resetGetUserInfo());

      expect(getState()).toMatchObject({
        getUserInfo: {
          info: null,
          loading: false,
          error: false,
        },
      });
    });
  });

  describe("Проверка updateUserInfo", () => {
    it("Сохраняет состояние updateUserInfo в state", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(updateUserInfoResponse));

      const { getState } = store;

      await store.dispatch(updateUserInfo(updateUserInfoRequest));

      expect(getState()).toMatchObject({
        updateUserInfo: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(localStorageUtils.getAccessToken).toBeCalled();
      expect(fetchMock).toBeCalledWith(updateUserInfoUrl, expect.anything());
    });

    it("Задает состояние ошибки updateUserInfo в state при ошибке", async () => {
      fetchMock.mockRejectOnce(new Error("Ошибка"));

      const { getState } = store;

      await store.dispatch(updateUserInfo(updateUserInfoRequest));

      expect(getState()).toMatchObject({
        updateUserInfo: {
          success: null,
          loading: false,
          error: true,
        },
      });
      expect(localStorageUtils.getAccessToken).toBeCalled();
      expect(fetchMock).toBeCalledWith(updateUserInfoUrl, expect.anything());
    });

    it("Сбрасывает состояние updateUserInfo в state при вызове resetUpdateUserInfo", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(updateUserInfoResponse));

      const { getState } = store;

      await store.dispatch(updateUserInfo(updateUserInfoRequest));

      expect(getState()).toMatchObject({
        updateUserInfo: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(localStorageUtils.getAccessToken).toBeCalled();
      expect(fetchMock).toBeCalledWith(updateUserInfoUrl, expect.anything());

      await store.dispatch(resetUpdateUserInfo());

      expect(getState()).toMatchObject({
        updateUserInfo: {
          success: null,
          loading: false,
          error: false,
        },
      });
    });
  });
});
