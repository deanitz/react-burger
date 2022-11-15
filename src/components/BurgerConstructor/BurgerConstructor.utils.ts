import { Ingredient } from "../../utils/dataShape";

export const getBurgerTotalPrice = (
  bun: Ingredient | null,
  innerIngredients: Ingredient[]
) => {
  return (
    (bun ? bun.price : 0) * 2 +
    innerIngredients.reduce((total, curr) => total + curr.price, 0)
  );
};
