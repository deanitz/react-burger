import selectedIngredientsTab, {
  initialState,
  setSelectedTab,
} from "./selectedIngredientsTabSlice";
import { configureStore } from "@reduxjs/toolkit";
import { IngredientTypes } from "../../types/dataTypes";

const initStore = initialState;

const storeWithBun = {
  value: IngredientTypes.bun,
};

const storeWithNull = {
  value: null,
};

describe("Проверка selectedIngredientsTabSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: selectedIngredientsTab,
      initStore,
    });
  });

  it("Задает выбранному табу значение IngredientTypes.bun", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
    store.dispatch(setSelectedTab(IngredientTypes.bun));
    expect(getState()).toStrictEqual(storeWithBun);
  });

  it("Задает выбранному табу значение null", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
    store.dispatch(setSelectedTab(IngredientTypes.bun));
    store.dispatch(setSelectedTab(null));
    expect(getState()).toStrictEqual(storeWithNull);
  });
});
