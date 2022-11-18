import { v4 as uuid } from "uuid";
import { Ingredient } from "../types/dataTypes";

export const addUniqueId = (ingredient: Ingredient) => ({
  ...ingredient,
  uniqueId: ingredient.uniqueId ?? uuid(),
});
