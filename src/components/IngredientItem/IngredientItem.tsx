import { Ingredient } from "../../types/dataTypes";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import styles from "./IngredientItem.module.css";

export type IngredientItemProps = {
  item: Ingredient;
  count: number;
};

const IngredientItem = ({ item, count }: IngredientItemProps) => {
  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag({
    type: item.type,
    item: { item },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <Link
      to={`/ingredients/${item._id}`}
      state={{
        background: location,
      }}
      className={styles.link}
    >
      <div
        className={`${styles.ingredientItem} ${isDrag ? styles.dragging : ""}`}
        ref={dragRef}
      >
        <img
          className="ml-4 mr-4"
          src={item.image}
          alt={`изображение ингредиента "${item.name}"`}
        />
        <p
          className={`text text_type_digits-default mt-1 mb-1 ${styles.price}`}
        >
          <span className="mr-1">{item.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`text text_type_main-default ${styles.name}`}>
          {item.name}
        </p>
        {Boolean(count) && <Counter count={count} size="default" />}
      </div>
    </Link>
  );
};

export default IngredientItem;
