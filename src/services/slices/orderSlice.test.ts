import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import reducer, {
  initialState,
  getOrderInfo,
  resetOrderInfo,
} from "./orderSlice";
import { configureStore } from "@reduxjs/toolkit";
import fetchMock from "jest-fetch-mock";
import { API_URL } from "../burgerApi";

const logService = require("../logService");
jest.mock("../logService");

const initStore = initialState;

const url = `${API_URL}/orders`;

const testRequest = {
  ingredients: [
    "id ингредиента 1",
    "id ингредиента 2",
    "id ингредиента 3",
    "id ингредиента 1",
  ],
}

const testResponse = {
  success: true,
  name: "Тестовый бургер",
  order: {
    number: 123456,
  },
};

const storeWithData = {
  orderInfo: {
    name: "Тестовый бургер",
    number: 123456,
  },
  orderInfoLoading: false,
  orderInfoError: false,
};

const storeWithError = {
  orderInfo: null,
  orderInfoLoading: false,
  orderInfoError: true,
};

describe("Проверка orderSlice", () => {
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

  it("Загружает информацию о заказе в state", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testResponse));

    const { getState } = store;

    await store.dispatch(getOrderInfo(testRequest));

    expect(getState()).toStrictEqual(storeWithData);
    expect(fetchMock).toBeCalledWith(url, expect.anything());
  });

  it("Не загружает ингредиенты в state и переходит в состояние ошибки при ошибке fetch", async () => {
    fetchMock.mockRejectOnce(new Error("Ошибка"));

    const { getState } = store;

    await store.dispatch(getOrderInfo(testRequest));

    expect(getState()).toStrictEqual(storeWithError);
    expect(fetchMock).toBeCalledWith(url, expect.anything());
  });

  it("resetOrderInfo сбрасывает состояние state", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testResponse));

    const { getState } = store;

    await store.dispatch(getOrderInfo(testRequest));

    expect(getState()).toStrictEqual(storeWithData);
    expect(fetchMock).toBeCalledWith(url, expect.anything());

    await store.dispatch(resetOrderInfo());

    expect(getState()).toStrictEqual(initStore);
  });
});
