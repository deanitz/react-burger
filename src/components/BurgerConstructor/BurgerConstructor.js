import PropTypes from "prop-types";
import dataShape from "../../utils/dataShape";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCheckout from "../BurgerCheckout/BurgerCheckout";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import { getStubOrderId } from "../../utils/stubDataUtils";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ bun, innerIngredients }) => {
  const {
    isDisplayed: isModal,
    show: showModal,
    close: closeModal,
  } = useModal();

  const getBurgerTotalPrice = () => {
    return (
      bun.price * 2 +
      innerIngredients.reduce((total, curr) => total + curr.price, 0)
    );
  };

  const orderId = getStubOrderId();

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails orderNumber={orderId} />
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
          onOrderClick={showModal}
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
