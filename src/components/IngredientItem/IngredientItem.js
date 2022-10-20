import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import styles from "./IngredientItem.module.css";

const IngredientItem = ({ item, count, handleClick }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: item.type,
    item: { item },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <>
      <div
        className={`${styles.ingredientItem} ${isDrag ? styles.dragging : ""}`}
        onClick={() => handleClick(item)}
        ref={dragRef}
      >
        <img
          className="ml-4 mr-4"
          src={item.image}
          alt="Изображение ингредиента"
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
    </>
  );
};

IngredientItem.propTypes = {
  item: dataShape.isRequired,
  count: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default IngredientItem;
