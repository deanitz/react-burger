import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCheckout from "../BurgerCheckout/BurgerCheckout";
import Modal from "../Modal/Modal";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ bun, innerIngredients }) => {
  const getBurgerTotalPrice = () => {
    return (
      bun.price * 2 +
      innerIngredients.reduce((total, curr) => total + curr.price, 0)
    );
  };

  const handleCloseModal = () => {
    console.log("nah!");
  };

  const modal = (
    <Modal
      header={<h1 className="text text_type_main-medium">Внимание!</h1>}
      onClose={handleCloseModal}
    >
      <p>Спасибо за внимание!</p>
      <p>Открывай меня, если станет скучно :)</p>
    </Modal>
  );

  return (
    <>
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
          {innerIngredients.map((innerIngredient) => (
            <div
              key={innerIngredient.uniqueId}
              className={styles.innerIngredientContainer}
            >
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
      {modal}
    </>
  );
};

BurgerConstructor.propTypes = {
  bun: dataShape.isRequired,
  innerIngredients: PropTypes.arrayOf(dataShape).isRequired,
};

export default BurgerConstructor;
