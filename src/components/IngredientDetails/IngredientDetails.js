import IngredientPropertyItem from "../IngredientPropertyItem/IngredientPropertyItem";
import dataShape from "../../utils/dataShape";

import styles from "./IngredientDetails.module.css";

const IngredientDetails = ({ item }) => {
  return (
    <div className={styles.ingredientDetailsContainer}>
      <img
        className={`${styles.ingredientDetailsImage} ml-4 mr-4`}
        src={item.image_large}
        alt="Изображение ингредиента"
      />
      <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
      <div className={styles.ingredientDetailsPropertiesContainer}>
        <IngredientPropertyItem name="Калории, ккал" value={item.calories} />
        <IngredientPropertyItem name="Белки, г" value={item.proteins} />
        <IngredientPropertyItem name="Жиры, г" value={item.fat} />
        <IngredientPropertyItem name="Углеводы, г" value={item.carbohydrates} />
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  item: dataShape.isRequired,
};

export default IngredientDetails;
