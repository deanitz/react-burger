import { v4 as uuid } from "uuid";
import { Ingredient } from "./dataShape";

// TODO mb enum
export const TYPE_BUN = "bun";
export const TYPE_SAUCE = "sauce";
export const TYPE_MAIN = "main";

export const TYPE_CONSTRUCTOR_INNER_INGREDIENT = "constructorInnerIngredient";

export const addUniqueId = (ingredient: Ingredient) => ({
  ...ingredient,
  uniqueId: ingredient.uniqueId ?? uuid(),
});
