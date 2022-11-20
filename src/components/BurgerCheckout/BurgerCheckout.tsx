import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerCheckout.module.css";

export type BurgerCheckoutProps = {
  total: number;
  onOrderClick: (e: React.SyntheticEvent<Element, Event>) => void;
  disabled: boolean;
};

const BurgerCheckout = ({
  total,
  onOrderClick,
  disabled,
}: BurgerCheckoutProps) => {
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

export default BurgerCheckout;
