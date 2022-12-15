import reducer, {
  initialState,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
  connect,
  disconnect,
} from "./ordersFeedSlice";
import { configureStore } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../types/utilityTypes";

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

const errorMessage = "Ошибка";

describe("Проверка ordersFeedSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
      initStore,
    });
  });

  it("На старте имеет изначальное значение", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
  });

  it("wsConnecting задает в store WebsocketStatus.CONNECTING", async () => {
    const { getState } = store;

    await store.dispatch(wsConnecting());

    expect(getState()).toMatchObject({
      status: WebsocketStatus.CONNECTING,
    });
  });

  it("wsOpen задает в store WebsocketStatus.ONLINE", async () => {
    const { getState } = store;

    await store.dispatch(wsOpen());

    expect(getState()).toMatchObject({
      status: WebsocketStatus.ONLINE,
    });
  });

  it("wsClose задает в store WebsocketStatus.OFFLINE", async () => {
    const { getState } = store;

    await store.dispatch(wsClose());

    expect(getState()).toMatchObject({
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("wsError задает в store connectionError", async () => {
    const { getState } = store;

    await store.dispatch(wsError(errorMessage));

    expect(getState()).toMatchObject({
      connectionError: errorMessage,
    });
  });

  it("wsMessage задает в store полученное сообщение", async () => {
    const { getState } = store;

    await store.dispatch(wsMessage(ordersMessageData));

    expect(getState()).toMatchObject({
      orders: ordersMessageData.orders,
      total: ordersMessageData.total,
      totalToday: ordersMessageData.totalToday,
    });
  });

  it("содержит action connect", async () => {
    const wsUrl = "wsUrl";
    const expectedAction = {
      type: "ORDERS_FEED_CONNECT",
      payload: wsUrl,
    };
    expect(connect(wsUrl)).toStrictEqual(expectedAction);
  });

  it("содержит action disconnect", async () => {
    const expectedAction = {
      type: "ORDERS_FEED_DISCONNECT",
    };
    expect(disconnect()).toEqual(expectedAction);
  });
});
