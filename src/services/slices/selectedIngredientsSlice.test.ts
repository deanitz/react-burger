import reducer, {
  initialState,
  reset,
  addSelectedIngredient,
  removeSelectedIngredient,
  reorderSelectedIngredients,
  setBun,
} from "./selectedIngredientsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Ingredient, IngredientTypes, OrderData } from "../../types/dataTypes";

const initStore = initialState;

const testBun: Ingredient = {
  _id: "_id1",
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
  uniqueId: "uniqueId1",
};

const testOtherBun: Ingredient = {
  _id: "_idOther",
  name: "Тестовая булка иная",
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
  uniqueId: "uniqueIdOther",
};

const testSauce: Ingredient = {
  _id: "_id2",
  name: "Тестовый соус",
  type: IngredientTypes.sauce,
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 123,
  image: "image_url",
  image_mobile: "image_mobile_url",
  image_large: "image_large_url",
  __v: 101,
  uniqueId: "uniqueId2",
};

const testMainShape = {
  _id: "_id3",
  name: "Тестовая котлета",
  type: IngredientTypes.main,
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 123,
  image: "image_url",
  image_mobile: "image_mobile_url",
  image_large: "image_large_url",
  __v: 102,
};

const testMain: Ingredient = {
  ...testMainShape,
  uniqueId: "uniqueId3",
};

const testDraggable: Ingredient = {
  _id: "_id4",
  name: "Тестовый чеснок",
  type: IngredientTypes.main,
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 123,
  image: "image_url",
  image_mobile: "image_mobile_url",
  image_large: "image_large_url",
  __v: 103,
  uniqueId: "uniqueId4",
};

const storeWithBun = {
  bun: testBun,
};

const storeWithOtherBun = {
  bun: testOtherBun,
};

const storeWithBunAndSauce = {
  bun: testBun,
  inner: [testSauce],
};

describe("Проверка selectedIngredientsSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
      preloadedState: initStore,
    });
  });

  it("содержит пустое состояние в начале работы", async () => {
    const { getState } = store;
    expect(getState()).toStrictEqual(initStore);
  });

  it('setBun задает bun "Тестовая булка"', async () => {
    const { getState } = store;

    store.dispatch(setBun(testBun));

    expect(getState()).toMatchObject(storeWithBun);
  });

  it("setBun меняет bun", async () => {
    const { getState } = store;

    store.dispatch(setBun(testBun));
    store.dispatch(setBun(testOtherBun));

    expect(getState()).toMatchObject(storeWithOtherBun);
  });

  it("reset сбрасывает состояние до начального", async () => {
    const { getState } = store;
    expect(getState()).toMatchObject(initStore);

    store.dispatch(setBun(testBun));
    store.dispatch(addSelectedIngredient(testSauce));

    expect(getState()).toMatchObject(storeWithBunAndSauce);

    store.dispatch(reset());

    expect(getState()).toMatchObject(initStore);
  });

  it("addSelectedIngredient добавляет ингредиент в начало списка", async () => {
    const { getState } = store;

    store.dispatch(addSelectedIngredient(testSauce));
    store.dispatch(addSelectedIngredient(testMain));

    const firstInnerIngredient = getState().inner[0];

    expect(firstInnerIngredient).toMatchObject(testMain);
  });

  it("addSelectedIngredient добавляет ингредиентам uniqueId", async () => {
    const { getState } = store;

    store.dispatch(addSelectedIngredient(testMainShape));
    store.dispatch(addSelectedIngredient(testMainShape));

    const firstInnerIngredient = getState().inner[0];
    const secondInnerIngredient = getState().inner[1];

    expect(firstInnerIngredient.uniqueId).not.toEqual(
      secondInnerIngredient.uniqueId
    );
  });

  it("removeSelectedIngredient удаляет ингредиент по uniqueId", async () => {
    const { getState } = store;

    store.dispatch(addSelectedIngredient(testMain));
    store.dispatch(addSelectedIngredient(testSauce));
    store.dispatch(addSelectedIngredient(testMain));

    const firstMain = getState().inner[0];
    const secondMain = getState().inner[2];

    const sauceUniqueId = getState().inner[1].uniqueId;

    store.dispatch(removeSelectedIngredient(sauceUniqueId));

    expect(getState().inner).toMatchObject([firstMain, secondMain]);
  });

  it(
    "reorderSelectedIngredients при перемещении вниз " +
      "помещает перемещаемый ингредиент " +
      "под целевым",
    async () => {
      const { getState } = store;

      store.dispatch(addSelectedIngredient(testMain));
      store.dispatch(addSelectedIngredient(testSauce));
      store.dispatch(addSelectedIngredient(testDraggable));

      const dragged = getState().inner[0];
      const sauce = getState().inner[1];
      const main = getState().inner[2];

      store.dispatch(
        reorderSelectedIngredients({
          draggedIngredient: dragged,
          staticIngredient: main,
        })
      );

      expect(getState().inner).toMatchObject([sauce, main, dragged]);
    }
  );

  it(
    "reorderSelectedIngredients при перемещении вверх " +
      "помещает перемещаемый ингредиент " +
      "над целевым",
    async () => {
      const { getState } = store;

      store.dispatch(addSelectedIngredient(testDraggable));
      store.dispatch(addSelectedIngredient(testMain));
      store.dispatch(addSelectedIngredient(testSauce));

      const sauce = getState().inner[0];
      const main = getState().inner[1];
      const dragged = getState().inner[2];

      store.dispatch(
        reorderSelectedIngredients({
          draggedIngredient: dragged,
          staticIngredient: main,
        })
      );

      expect(getState().inner).toMatchObject([sauce, dragged, main]);
    }
  );
});
