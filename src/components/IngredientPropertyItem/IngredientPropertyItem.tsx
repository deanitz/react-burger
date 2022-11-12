import { FC } from "react";
import styles from "./IngredientPropertyItem.module.css";

export interface IIngredientPropertyItemProps {
  name: string;
  value: string;
}

const IngredientPropertyItem: FC<IIngredientPropertyItemProps> = ({
  name,
  value,
}) => {
  return (
    <div className={styles.propertyContainer}>
      <p className="text text_type_main-default mb-1">{name}</p>
      <p className="text text_type_digits-default">{value}</p>
    </div>
  );
};

export default IngredientPropertyItem;
