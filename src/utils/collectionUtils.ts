import {
  Ingredient,
  IngredientTypes,
  IngredientWithCount,
} from "../types/dataTypes";
import { IUniqueId, Nullable } from "../types/utilityTypes";

type SortableIngredientLike =
  | Ingredient
  | IngredientWithCount
  | IUniqueId
  | undefined;
export const sortBunFirst = (
  a: SortableIngredientLike,
  b: SortableIngredientLike
) => {
  if (getType(a) === IngredientTypes.bun) {
    return -1;
  }
  if (getType(b) === IngredientTypes.bun) {
    return 1;
  }
  return 0;
};

const getType = (item: SortableIngredientLike) => {
  if (!item) {
    return undefined;
  }
  let ingredient = (item as IngredientWithCount).ingredient;
  if (ingredient) {
    return ingredient.type;
  }
  ingredient = item as Ingredient;
  return ingredient?.type;
};

export const getIngredientsCount = (
  item: Ingredient,
  items: Array<Nullable<Ingredient>>
) => {
  return items.reduce(
    (acc, curr) =>
      curr && (curr as Ingredient)._id
        ? (curr as Ingredient)._id === item._id
          ? acc + 1
          : acc
        : acc,
    0
  );
};
