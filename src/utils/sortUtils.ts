import {
  Ingredient,
  IngredientTypes,
  OrderDataHistorical,
} from "../types/dataTypes";
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

export const sortByDateDesc = (
  a: OrderDataHistorical,
  b: OrderDataHistorical
) => {
  return new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime()
    ? -1
    : 1;
};
