import reducer, {
  initialState,
  setSelectedTab,
} from "./selectedIngredientsTabSlice";
import { configureStore } from "@reduxjs/toolkit";
import { IngredientTypes } from "../../types/dataTypes";

const initStore = initialState;

const storeWithBun = {
  value: IngredientTypes.bun,
};

const storeWithSauce = {
  value: IngredientTypes.sauce,
};

describe("Проверка selectedIngredientsTabSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
      preloadedState: initStore,
    });
  });

  it("Задает выбранному табу значение IngredientTypes.bun", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
    store.dispatch(setSelectedTab(IngredientTypes.bun));
    expect(getState()).toStrictEqual(storeWithBun);
  });

  it("Задает выбранному табу новое значение", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
    store.dispatch(setSelectedTab(IngredientTypes.bun));
    store.dispatch(setSelectedTab(IngredientTypes.sauce));
    expect(getState()).toStrictEqual(storeWithSauce);
  });
});
