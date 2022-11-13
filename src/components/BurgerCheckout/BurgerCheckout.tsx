import PropTypes from "prop-types";
import { FC } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerCheckout.module.css";

export type BurgerCheckoutProps = {
  total: number,
  onOrderClick: (() => void) | ((e: React.SyntheticEvent<Element, Event>) => void) | undefined,
  disabled: boolean,
};

const BurgerCheckout: FC<BurgerCheckoutProps> = ({ total, onOrderClick, disabled }) => {
  return (
    <div className={`${styles.totalContainer} mt-10 mr-8`}>
      <p className="text text_type_digits-medium mr-10">
        <span className="mr-2">{total}</span>
        <CurrencyIcon type="primary" />
      </p>
      <Button
        type="primary"
        htmlType="button"
        size="large"
        onClick={onOrderClick}
        disabled={disabled}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

BurgerCheckout.propTypes = {
  total: PropTypes.number.isRequired,
  onOrderClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default BurgerCheckout;
