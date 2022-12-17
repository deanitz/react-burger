import { v4 as uuid } from "uuid";
import { Ingredient, IngredientShape } from "../types/dataTypes";
import { IUniqueId } from "../types/utilityTypes";

export const addUniqueId = (
  ingredient: IngredientShape | Ingredient
): Ingredient => ({
  ...ingredient,
  uniqueId: (ingredient as Ingredient)?.uniqueId ?? uuid(),
});

export const getUniqueIdObject = (): IUniqueId => ({
  uniqueId: uuid(),
});
