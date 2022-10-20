export const getBurgerTotalPrice = (bun, innerIngredients) => {
  return (
    (bun ? bun.price : 0) * 2 +
    innerIngredients.reduce((total, curr) => total + curr.price, 0)
  );
};
