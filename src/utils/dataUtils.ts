import { v4 as uuid } from "uuid";
import { Ingredient } from "../types/dataTypes";
import { IUniqueId } from "../types/utilityTypes";

export const addUniqueId = (ingredient: Ingredient): Ingredient => ({
  ...ingredient,
  uniqueId: ingredient.uniqueId ?? uuid(),
});

export const getUniqueIdObject = (): IUniqueId => ({
  uniqueId: uuid(),
});
