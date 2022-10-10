const getUniqueSelectedIngredientsByIds = (ingredientIds, ingredientsData) => {
  return ingredientIds.map((id, index) => {
    const found = ingredientsData.find((item) => item._id === id);
    return {
      ...found,
      uniqueId: `${id}_${index}`,
    };
  });
};

const splitToBunAndInner = (selectedIngredientsData) => {
  const bun = selectedIngredientsData.find((item) => item.type === "bun");
  const innerIngredients = selectedIngredientsData.filter(
    (item) => item.type !== "bun"
  );

  return { bun, innerIngredients };
};

export const getSplittedIngredientsData = (
  selectedIngredientsIds,
  ingredientsData
) => {
  const selectedIngredientsAll = getUniqueSelectedIngredientsByIds(
    selectedIngredientsIds,
    ingredientsData
  );

  return splitToBunAndInner(selectedIngredientsAll);
};
