export const getStubSelectedIngredientIds = (ingredientsData) => {
  const bunId = ingredientsData.find((item) => item.type === "bun")._id;

  const sauceId = ingredientsData.find((item) => item.type === "sauce")._id;

  const mainIds = ingredientsData
    .filter((item) => item.type === "main")
    .slice(0, 3)
    .map((item) => item._id);

  return [bunId, sauceId, ...mainIds, ...mainIds];
};

export const getStubOrderId = () => {
  return Math.floor(Math.random() * 999999);
};
