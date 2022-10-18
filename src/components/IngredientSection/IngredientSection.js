import { forwardRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import IngredientItem from "../IngredientItem/IngredientItem";

import styles from "./IngredientSection.module.css";

const IngredientSection = forwardRef(({ name, data }, ref) => {
  const { selectedIngredientsIds } = useSelector((store) => ({
    selectedIngredientsIds: store.selectedIngredients.selectedIngredientsIds,
  }));

  const getCount = (item) => {
    return selectedIngredientsIds.reduce(
      (acc, curr) => (curr === item._id ? acc + 1 : acc),
      0
    );
  };

  return (
    <section ref={ref}>
      <h2 className="text text_type_main-medium mb-6">{name}</h2>
      <div className={styles.ingredientItemsContainer}>
        {data.map((item) => (
          <IngredientItem item={item} count={getCount(item)} key={item._id} />
        ))}
      </div>
    </section>
  );
});

IngredientSection.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataShape).isRequired,
};

export default IngredientSection;
