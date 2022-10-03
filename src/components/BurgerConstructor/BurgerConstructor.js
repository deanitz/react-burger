import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCheckout from "../BurgerCheckout/BurgerCheckout";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ bun, innerIngredients }) => {
  const getBurgerTotalPrice = () => {
    return (
      bun.price * 2 +
      innerIngredients.reduce((total, curr) => total + curr.price, 0)
    );
  };

  return (
    <section className={`${styles.burgerConstructor} mt-25`}>
      <div className="ml-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div
        className={`${styles.innerIngredientsListContainer} custom-scroll mt-4 mb-4`}
      >
        {innerIngredients.map((innerIngredient, index) => (
          <div key={index} className={styles.innerIngredientContainer}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={innerIngredient.name}
              price={innerIngredient.price}
              thumbnail={innerIngredient.image}
            />
          </div>
        ))}
      </div>
      <div className="ml-8">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <BurgerCheckout total={getBurgerTotalPrice()} />
    </section>
  );
};

BurgerConstructor.propTypes = {
  bun: dataShape.isRequired,
  innerIngredients: PropTypes.arrayOf(dataShape).isRequired,
};

export default BurgerConstructor;
