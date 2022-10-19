export const getBurgerTotalPrice = (bun, innerIngredients) => {
  return (
    bun.price * 2 +
    innerIngredients.reduce((total, curr) => total + curr.price, 0)
  );
};
