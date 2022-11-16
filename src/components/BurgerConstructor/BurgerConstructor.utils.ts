import { Ingredient } from "../../types/dataTypes";
import { Nullable } from "../../types/utilityTypes";

export const getBurgerTotalPrice = (
  bun: Nullable<Ingredient>,
  innerIngredients: Ingredient[]
) => {
  return (
    (bun ? bun.price : 0) * 2 +
    innerIngredients.reduce((total, curr) => total + curr.price, 0)
  );
};
