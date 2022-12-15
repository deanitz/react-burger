import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import reducer, {
  initialState,
  setOrder,
  resetOrder,
} from "./orderDetailsSlice";
import { loadOrder, saveOrders } from "../actions/orderStorageActions";
import { configureStore } from "@reduxjs/toolkit";
import fetchMock from "jest-fetch-mock";
import { createOrderStorageMiddleware } from "../middleware/orderStorageMiddleware";

const localStorageUtils = require("../../utils/localStorageUtils");
jest.mock("../../utils/localStorageUtils");

const orderStorageMiddleware = createOrderStorageMiddleware();

const initStore = initialState;

const orderData1 = {
  _id: "63976a5a99a25c001cd68b84",
  ingredients: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733cd"],
  status: "done",
  name: "Люминесцентный фалленианский антарианский краторный экзо-плантаго spicy минеральный астероидный бессмертный space альфа-сахаридный метеоритный био-марсианский традиционный-галактический бургер",
  createdAt: "2022-12-12T17:52:26.792Z",
  updatedAt: "2022-12-12T17:52:27.182Z",
  number: 33679,
};

const orderData2 = {
  _id: "6397693b99a25c001cd68b79",
  ingredients: [
    "60d3b41abdacab0026a733c7",
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733cc",
    "60d3b41abdacab0026a733c7",
  ],
  status: "done",
  name: "Space spicy флюоресцентный бургер",
  createdAt: "2022-12-12T17:47:39.484Z",
  updatedAt: "2022-12-12T17:47:39.842Z",
  number: 33678,
};

const ordersMessageData = {
  orders: [orderData1, orderData2],
  total: 123456,
  totalToday: 321,
};

describe("Проверка orderDetailsSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(orderStorageMiddleware),
      reducer: reducer,
      initStore,
    });

    localStorageUtils.storeOrders = jest.fn();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("На старте имеет изначальное значение", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
  });

  it("saveOrders cохраняет заказы в localStorage", async () => {
    await store.dispatch(saveOrders(ordersMessageData));

    expect(localStorageUtils.storeOrders).toBeCalledWith(ordersMessageData);
  });

  it("loadOrder загружает заказ из localStorage и сохраняет его в state, если он есть в localStorage", async () => {
    const { getState } = store;
    localStorageUtils.loadFromStoredOrders = jest.fn(() => orderData1);

    await store.dispatch(loadOrder(orderData1._id));

    expect(localStorageUtils.loadFromStoredOrders).toBeCalledWith(
      orderData1._id
    );

    expect(getState()).toMatchObject({
      orderData: orderData1,
      isOrderLoaded: true,
    });
  });

  it("loadOrder загружает заказ из localStorage и сохраняет undefined в state, если его нет в localStorage", async () => {
    const { getState } = store;
    localStorageUtils.loadFromStoredOrders = jest.fn(() => undefined);

    await store.dispatch(loadOrder(orderData1._id));

    expect(localStorageUtils.loadFromStoredOrders).toBeCalledWith(
      orderData1._id
    );

    expect(getState()).toMatchObject({
      orderData: undefined,
      isOrderLoaded: true,
    });
  });

  it("setOrder сохраняет заказ в state", async () => {
    const { getState } = store;

    await store.dispatch(setOrder(orderData1));

    expect(getState()).toMatchObject({
      orderData: orderData1,
      isOrderLoaded: true,
    });
  });

  it("resetOrder сбрасывает состояние state", async () => {
    const { getState } = store;

    await store.dispatch(setOrder(orderData1));

    expect(getState()).toMatchObject({
      orderData: orderData1,
      isOrderLoaded: true,
    });

    await store.dispatch(resetOrder());

    expect(getState()).toStrictEqual(initStore);
  });
});
