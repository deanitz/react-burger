import IngredientPropertyItem from "../IngredientPropertyItem/IngredientPropertyItem";
import { useMemo, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_NOT_FOUND } from "../../utils/routes";
import { Ingredient } from "../../utils/dataShape";
import styles from "./IngredientDetails.module.css";
import { useAppSelector } from "../../utils/store";

const IngredientDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { ingredientItems } = useAppSelector(({ ingredients }) => ({
    ingredientItems: ingredients.ingredientsData,
  }));

  const item = useMemo(() => {
    const result = ingredientItems.find((item) => item._id === params?.id);

    return result;
  }, [ingredientItems, params]);

  useEffect(() => {
    if (ingredientItems && ingredientItems.length && !item) {
      navigate(ROUTE_NOT_FOUND, { replace: false });
      return;
    }
  }, [item, navigate, ingredientItems]);

  return item ? (
    <div className={styles.ingredientDetailsContainer}>
      <img
        className={`${styles.ingredientDetailsImage} ml-4 mr-4`}
        src={item.image_large}
        alt={`изображение ингредиента "${item.name}"`}
      />
      <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
      <div className={styles.ingredientDetailsPropertiesContainer}>
        <IngredientPropertyItem name="Калории, ккал" value={item.calories} />
        <IngredientPropertyItem name="Белки, г" value={item.proteins} />
        <IngredientPropertyItem name="Жиры, г" value={item.fat} />
        <IngredientPropertyItem name="Углеводы, г" value={item.carbohydrates} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default IngredientDetails;
