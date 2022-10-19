import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./IngredientItem.module.css";

const IngredientItem = ({ item, count, handleClick }) => {
  return (
    <>
      <div className={styles.ingredientItem} onClick={() => handleClick(item)}>
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
};

export default IngredientItem;
