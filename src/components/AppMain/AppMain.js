import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import styles from "./AppMain.module.css";

import data from "../../utils/data";

const AppMain = () => {
  const selectedIngredientsIds = [
    "60666c42cc7b410027a1a9b1",
    "60666c42cc7b410027a1a9b9",
    "60666c42cc7b410027a1a9b4",
    "60666c42cc7b410027a1a9bb",
    "60666c42cc7b410027a1a9bb",
    "60666c42cc7b410027a1a9bc",
    "60666c42cc7b410027a1a9be",
    "60666c42cc7b410027a1a9be",
  ];

  const selectedIngredientsAll = selectedIngredientsIds.map((id, index) => {
    const found = data.find((item) => item._id === id);
    return {
      ...found,
      uniqueId: `${id}_${index}`,
    };
  });

  const selectedIngredientsInner = selectedIngredientsAll.filter(
    (item) => item.type !== "bun"
  );
  const selectedIngredientsBun = selectedIngredientsAll.find(
    (item) => item.type === "bun"
  );

  return (
    <main className={styles.appMain}>
      <BurgerIngredients
        data={data}
        selectedIngredientsIds={selectedIngredientsIds}
      />
      <BurgerConstructor
        bun={selectedIngredientsBun}
        innerIngredients={selectedIngredientsInner}
      />
    </main>
  );
};

export default AppMain;
