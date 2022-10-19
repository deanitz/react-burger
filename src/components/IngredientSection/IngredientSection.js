import { forwardRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import IngredientItem from "../IngredientItem/IngredientItem";

import styles from "./IngredientSection.module.css";

const IngredientSection = forwardRef(({ name, data, handleItemClick }, ref) => {
  const { selectedIngredients } = useSelector((store) => ({
    selectedIngredients: store.selectedIngredients.selectedIngredients,
  }));

  const getCount = (item) => {
    return [selectedIngredients.bun, ...selectedIngredients.inner].reduce(
      (acc, curr) => (curr._id === item._id ? acc + 1 : acc),
      0
    );
  };

  return (
    <section>
      <h2 className="text text_type_main-medium mb-6" ref={ref}>
        {name}
      </h2>
      <div className={styles.ingredientItemsContainer}>
        {data.map((item) => (
          <IngredientItem
            item={item}
            count={getCount(item)}
            key={item._id}
            handleClick={handleItemClick}
          />
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
