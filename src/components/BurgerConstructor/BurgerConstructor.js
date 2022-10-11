import { useContext, useMemo, useReducer, useCallback } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCheckout from "../BurgerCheckout/BurgerCheckout";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import {
  AllIngredientsContext,
  SelectedIngredientsContext,
} from "../../services/appContext";
import { placeOrder } from "../../services/burgerApi";
import { logError } from "../../services/logService";
import {
  ORDER_ACTION_SET,
  orderIdInitial,
  orderIdReducer,
  getSplittedIngredientsData,
  getBurgerTotalPrice,
} from "./BurgerConstructor.utils";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {
  const { ingredientsData } = useContext(AllIngredientsContext);
  const { selectedIngredientsIds, setSelectedIngredientsIds } = useContext(
    SelectedIngredientsContext
  );

  //Тренировочное использование useReducer.
  const [orderId, orderIdDispatcher] = useReducer(
    orderIdReducer,
    orderIdInitial
  );

  const {
    isDisplayed: isModal,
    show: showModal,
    close: closeModal,
  } = useModal();

  const { bun, innerIngredients, totalPrice } = useMemo(() => {
    const { bun, innerIngredients } = getSplittedIngredientsData(
      selectedIngredientsIds,
      ingredientsData
    );

    return {
      bun,
      innerIngredients,
      totalPrice: getBurgerTotalPrice(bun, innerIngredients),
    };
  }, [selectedIngredientsIds, ingredientsData]);

  // Стабовые методы для демонстрации записи в контекст
  const handleInnerIngredientClick = (innerIngredient) => {
    const stubSortedIngredientsIdsList = [
      bun,
      innerIngredient,
      ...innerIngredients.filter(
        (ingredient) => ingredient.uniqueId !== innerIngredient.uniqueId
      ),
    ].map((item) => item._id);

    setSelectedIngredientsIds(stubSortedIngredientsIdsList);
  };

  const handleIngredientRemove = (innerIngredient) => {
    const stubSortedIngredientsIdsList = [
      bun,
      ...innerIngredients.filter(
        (ingredient) => ingredient.uniqueId !== innerIngredient.uniqueId
      ),
    ].map((item) => item._id);

    setSelectedIngredientsIds(stubSortedIngredientsIdsList);
  };

  const handleBurgerCheckoutClick = useCallback(() => {
    const order = {
      ingredients: selectedIngredientsIds,
    };

    placeOrder(order)
      .then((data) => {
        orderIdDispatcher({
          type: ORDER_ACTION_SET,
          payload: data.order.number,
        });
        showModal();
      })
      .catch((error) => {
        logError(error);
      });
  }, [selectedIngredientsIds, orderIdDispatcher, showModal]);

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails orderNumber={orderId.value} />
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
              <div onClick={() => handleInnerIngredientClick(innerIngredient)}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={innerIngredient.name}
                price={innerIngredient.price}
                thumbnail={innerIngredient.image}
                handleClose={() => handleIngredientRemove(innerIngredient)}
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
          total={totalPrice}
          onOrderClick={handleBurgerCheckoutClick}
        />
      </section>
      {isModal && modal}
    </>
  );
};

export default BurgerConstructor;
