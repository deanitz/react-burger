import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./IngredientItem.module.css";

const IngredientItem = ({ image, price, name, count }) => {
  return (
    <div className={styles.ingredientItem}>
      <img className="ml-4 mr-4" src={image} alt="Изображение ингредиента" />
      <p className={`text text_type_digits-default mt-1 mb-1 ${styles.price}`}>
        <span className="mr-1">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={`text text_type_main-default ${styles.name}`}>{name}</p>
      {Boolean(count) && <Counter count={count} size="default" />}
    </div>
  );
};

IngredientItem.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientItem;
