import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import reducer, { initialState, fetchIngredients } from "./ingredientsSlice";
import { configureStore } from "@reduxjs/toolkit";
import fetchMock from "jest-fetch-mock";
import { API_URL } from "../burgerApi";

const logService = require("../logService");
jest.mock("../logService");

const initStore = initialState;

const url = `${API_URL}/ingredients`;

const testDataIngredients = [
  {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733c8",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733d4",
    name: "Сыр с астероидной плесенью",
    type: "main",
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: "https://code.s3.yandex.net/react/code/cheese.png",
    image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/cheese-large.png",
    __v: 0,
  },
];

const testResponse = {
  success: true,
  data: testDataIngredients,
};

const storeWithData = {
  ingredientsData: testDataIngredients,
  ingredientsDataLoading: false,
  ingredientsDataError: false,
};

describe("Проверка ingredientsSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
      initStore,
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

  it("Загружает ингредиенты в state", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testResponse));

    const { getState } = store;

    await store.dispatch(fetchIngredients());

    expect(getState()).toStrictEqual(storeWithData);
    expect(fetchMock).toBeCalledWith(url, expect.anything());
  });

  it("Не загружает ингредиенты в state и переходит в состояние ошибки при ошибке fetch", async () => {
    fetchMock.mockRejectOnce("Ошибка");

    const { getState } = store;

    await store.dispatch(fetchIngredients());

    expect(getState()).toStrictEqual({
      ingredientsData: [],
      ingredientsDataLoading: false,
      ingredientsDataError: true,
    });
    expect(fetchMock).toBeCalledWith(url, expect.anything());
  });
});
