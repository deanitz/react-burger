export const ORDER_ACTION_SET = "set";
export const ORDER_ACTION_RESET = "reset";
export const orderIdInitial = { value: 0 };

export const orderIdReducer = (_, action) => {
  switch (action.type) {
    case "set":
      return { value: action.payload };
    case "reset":
      return orderIdInitial;
    default:
      throw new Error(`Неверный тип action: ${action.type}`);
  }
};

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

export const getBurgerTotalPrice = (bun, innerIngredients) => {
  return (
    bun.price * 2 +
    innerIngredients.reduce((total, curr) => total + curr.price, 0)
  );
};
