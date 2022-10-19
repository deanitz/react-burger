import { v4 as uuid } from "uuid";

export const getDefaultSelectedIngredients = (ingredientsData) => {
  const bun = addUniqueId(ingredientsData.find((item) => item.type === "bun"));
  const sauce = addUniqueId(
    ingredientsData.find((item) => item.type === "sauce")
  );
  const main = addUniqueId(
    ingredientsData.find((item) => item.type === "main")
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
