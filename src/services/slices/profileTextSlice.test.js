import reducer, { initialState, setInfoText } from "./profileTextSlice";
import { configureStore } from "@reduxjs/toolkit";

const initStore = initialState;

const storeWithInfo1 = {
  info: "текст страницы профиля",
};

const storeWithInfo2 = {
  info: "другой текст страницы профиля",
};

describe("Проверка profileTextSlice", () => {
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

  it("Задает текст информации профиля", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
    store.dispatch(setInfoText("текст страницы профиля"));
    expect(getState()).toStrictEqual(storeWithInfo1);
  });

  it("Изменяет текст информации профиля", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
    store.dispatch(setInfoText("текст страницы профиля"));
    store.dispatch(setInfoText("другой текст страницы профиля"));
    expect(getState()).toStrictEqual(storeWithInfo2);
  });
});
