import { v4 as uuid } from "uuid";

export const TYPE_BUN = "bun";
export const TYPE_SAUCE = "sauce";
export const TYPE_MAIN = "main";

export const TYPE_CONSTRUCTOR_INNER_INGREDIENT = "constructorInnerIngredient";

export const getDefaultSelectedIngredients = (ingredientsData) => {
  const bun = addUniqueId(
    ingredientsData.find((item) => item.type === TYPE_BUN)
  );
  const sauce = addUniqueId(
    ingredientsData.find((item) => item.type === TYPE_SAUCE)
  );
  const main = addUniqueId(
    ingredientsData.find((item) => item.type === TYPE_MAIN)
  );

  return {
    bun,
    inner: [sauce, main],
  };
};

export const addUniqueId = (ingredient) => ({
  ...ingredient,
  uniqueId: ingredient.uniqueId ?? uuid(),
});
