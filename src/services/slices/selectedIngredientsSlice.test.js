import selectedIngredients, {
    initialState,
    reset,
    addSelectedIngredient,
    removeSelectedIngredient,
    reorderSelectedIngredients,
    setBun,
  } from "./selectedIngredientsSlice";
  import { configureStore } from "@reduxjs/toolkit";
import { IngredientTypes } from "../../types/dataTypes";
  
  const initStore = initialState;

  const testBun = {
    _id: "_id",
    name: "Тестовая булка",
    type: IngredientTypes.bun,
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 123,
    image: "image_url",
    image_mobile: "image_mobile_url",
    image_large: "image_large_url",
    __v: 100,
  };

  const storeWithBun = {
    bun: testBun,
  }
  
  describe("Проверка selectedIngredientsSlice", () => {
    let store;
  
    beforeEach(() => {
      store = configureStore({
        reducer: selectedIngredients,
        initStore,
      });
    });
  
    it("setBun задает bun", async () => {
      const { getState } = store;
      expect(getState()).toStrictEqual(initStore);
      store.dispatch(setBun(testBun));
      expect(getState()).toMatchObject(storeWithBun);
    });
  });
  