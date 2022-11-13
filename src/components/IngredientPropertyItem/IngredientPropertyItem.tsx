import { FC } from "react";
import styles from "./IngredientPropertyItem.module.css";

const IngredientPropertyItem: FC<{
  name: string;
  value: number;
}> = ({ name, value }) => {
  return (
    <div className={styles.propertyContainer}>
      <p className="text text_type_main-default mb-1">{name}</p>
      <p className="text text_type_digits-default">{value}</p>
    </div>
  );
};

export default IngredientPropertyItem;
