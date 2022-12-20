import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import reducer, {
  initialState,
  reset,
  renew,
  resetState,
} from "./resetPasswordSlice";
import { configureStore } from "@reduxjs/toolkit";
import fetchMock from "jest-fetch-mock";
import { API_URL } from "../burgerApi";

const logService = require("../logService");
jest.mock("../logService");

const initStore = initialState;

const resetUrl = `${API_URL}/password-reset`;
const renewUrl = `${API_URL}/password-reset/reset`;

const resetEmail = "test@test.test";
const renewRequest = {
  password: "testPassword",
  token: "testToken",
};

const testResponse = {
  success: true,
};

describe("Проверка resetPasswordSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
      preloadedState: initStore,
    });

    logService.logError = jest.fn();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("На старте имеет изначальное значение", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
  });

  describe("Проверка reset", () => {
    it("Сохраняет состояние reset в state", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(testResponse));

      const { getState } = store;

      await store.dispatch(reset(resetEmail));

      expect(getState()).toMatchObject({
        reset: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(fetchMock).toBeCalledWith(resetUrl, expect.anything());
    });

    it("Задает состояние ошибки reset в state при ошибке", async () => {
      fetchMock.mockRejectOnce(new Error("Ошибка"));

      const { getState } = store;

      await store.dispatch(reset(resetEmail));

      expect(getState()).toMatchObject({
        reset: {
          success: false,
          loading: false,
          error: true,
        },
      });
      expect(fetchMock).toBeCalledWith(resetUrl, expect.anything());
    });

    it("resetState cбрасывает состояние state", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(testResponse));

      const { getState } = store;

      await store.dispatch(reset(resetEmail));

      expect(getState()).toMatchObject({
        reset: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(fetchMock).toBeCalledWith(resetUrl, expect.anything());

      await store.dispatch(resetState());

      expect(getState()).toMatchObject({
        reset: {
          success: null,
          loading: false,
          error: false,
        },
      });
    });
  });

  describe("Проверка renew", () => {
    it("Сохраняет состояние renew в state", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(testResponse));

      const { getState } = store;

      await store.dispatch(renew(renewRequest));

      expect(getState()).toMatchObject({
        renew: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(fetchMock).toBeCalledWith(renewUrl, expect.anything());
    });

    it("Задает состояние ошибки reset в state при ошибке", async () => {
      fetchMock.mockRejectOnce(new Error("Ошибка"));

      const { getState } = store;

      await store.dispatch(renew(renewRequest));

      expect(getState()).toMatchObject({
        renew: {
          success: false,
          loading: false,
          error: true,
        },
      });
      expect(fetchMock).toBeCalledWith(renewUrl, expect.anything());
    });

    it("resetState cбрасывает состояние state", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(testResponse));

      const { getState } = store;

      await store.dispatch(renew(renewRequest));

      expect(getState()).toMatchObject({
        renew: {
          success: true,
          loading: false,
          error: false,
        },
      });
      expect(fetchMock).toBeCalledWith(renewUrl, expect.anything());

      await store.dispatch(resetState());

      expect(getState()).toMatchObject({
        renew: {
          success: null,
          loading: false,
          error: false,
        },
      });
    });
  });
});
