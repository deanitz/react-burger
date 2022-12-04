import { Ingredient, IngredientTypes, OrderData } from "../types/dataTypes";
import { IUniqueId } from "../types/utilityTypes";

export const sortBunFirst = (
  a: Ingredient | IUniqueId,
  b: Ingredient | IUniqueId
) => {
  if ((a as Ingredient)?.type === IngredientTypes.bun) {
    return -1;
  }
  if ((b as Ingredient)?.type === IngredientTypes.bun) {
    return 1;
  }
  return 0;
};

export const sortByDateDesc = (a: OrderData, b: OrderData) => {
  return new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime()
    ? -1
    : 1;
};
