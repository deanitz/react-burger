import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import styles from "./AppMain.module.css";

const AppMain = ({ ingredientsData, selectedIngredientsIds }) => {
  return (
    <main className={styles.appMain}>
      <BurgerIngredients
        ingredientsData={ingredientsData}
        selectedIngredientsIds={selectedIngredientsIds}
      />
      <BurgerConstructor
        ingredientsData={ingredientsData}
        selectedIngredientsIds={selectedIngredientsIds}
      />
    </main>
  );
};

AppMain.propTypes = {
  ingredientsData: PropTypes.arrayOf(dataShape).isRequired,
};

export default AppMain;
