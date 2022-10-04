import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerCheckout.module.css";

const BurgerCheckout = ({ total }) => {
  return (
    <div className={`${styles.totalContainer} mt-10 mr-8`}>
      <p className="text text_type_digits-medium mr-10">
        <span className="mr-2">{total}</span>
        <CurrencyIcon type="primary" />
      </p>
      <Button type="primary" htmlType="button" size="large">
        Оформить заказ
      </Button>
    </div>
  );
};

BurgerCheckout.propTypes = {
  total: PropTypes.number.isRequired,
};

export default BurgerCheckout;
