import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCheckout from "../BurgerCheckout/BurgerCheckout";
import Modal from "../Modal/Modal";
import styles from "./BurgerConstructor.module.css";
import { useState } from "react";
import doneImage from "../../images/done.png";

const BurgerConstructor = ({ bun, innerIngredients }) => {
  const [isModal, setIsModal] = useState(false);

  const getBurgerTotalPrice = () => {
    return (
      bun.price * 2 +
      innerIngredients.reduce((total, curr) => total + curr.price, 0)
    );
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const handleOrderClick = () => {
    setIsModal(true);
  };

  const modal = (
    <Modal header={null} onClose={handleCloseModal}>
      <div className={styles.orderModalContentContainer}>
        <h1
          className={`${styles.orderModalNumber} text text_type_digits-large ml-15 mr-15`}
        >
          034536
        </h1>
        <h2 className="text text_type_main-medium mt-8">
          идентификатор заказа
        </h2>
        <img
          src={doneImage}
          alt="иконка подтверждения заказа"
          className="mt-15 mb-15"
        />
        <p className="text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default mb-15">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
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
        <BurgerCheckout
          total={getBurgerTotalPrice()}
          onOrderClick={handleOrderClick}
        />
      </section>
      {isModal && modal}
    </>
  );
};

BurgerConstructor.propTypes = {
  bun: dataShape.isRequired,
  innerIngredients: PropTypes.arrayOf(dataShape).isRequired,
};

export default BurgerConstructor;
