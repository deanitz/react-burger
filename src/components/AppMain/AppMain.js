import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import styles from "./AppMain.module.css";

import { getStubSelectedIngredientIds } from "../../utils/ingredientsUtils";

const AppMain = ({ ingredientsData }) => {
  // Стабовые данные
  const selectedIngredientsIds = getStubSelectedIngredientIds(ingredientsData);

  const selectedIngredientsAll = selectedIngredientsIds.map((id, index) => {
    const found = ingredientsData.find((item) => item._id === id);
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
        ingredientsData={ingredientsData}
        selectedIngredientsIds={selectedIngredientsIds}
      />
      <BurgerConstructor
        bun={selectedIngredientsBun}
        innerIngredients={selectedIngredientsInner}
      />
    </main>
  );
};

AppMain.propTypes = {
  total: PropTypes.arrayOf(dataShape).isRequired,
};

export default AppMain;
