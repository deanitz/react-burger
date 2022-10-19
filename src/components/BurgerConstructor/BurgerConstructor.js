import { useMemo, useCallback, useEffect } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCheckout from "../BurgerCheckout/BurgerCheckout";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import { getBurgerTotalPrice } from "./BurgerConstructor.utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderInfo,
  resetOrderInfo,
} from "../../services/slicers/orderSlice";
import {
  addSelectedIngredient,
  removeSelectedIngredient,
  updateSelectedIngredients,
  setBun,
} from "../../services/slicers/selectedIngredientsSlice";
import InnerIngredient from "./InnerIngredient";
import { useDrop } from "react-dnd";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { orderNumber, isOrderLoaded, isOrderLoadingError } = useSelector(
    (store) => ({
      orderNumber: store.order.orderInfo?.order?.number,
      isOrderLoaded:
        Boolean(store.order.orderInfo) &&
        !store.order.orderInfoLoading &&
        !store.order.orderInfoError,
      isOrderLoadingError: store.order.orderInfoError,
    })
  );

  const { selectedIngredients } = useSelector((store) => ({
    selectedIngredients: store.selectedIngredients.selectedIngredients,
  }));

  const {
    isDisplayed: isModal,
    show: showModal,
    close: closeModal,
  } = useModal();

  useEffect(() => {
    if (isOrderLoaded && !isModal) {
      showModal();
      return;
    }
    if (isOrderLoadingError) {
      alert("Что-то пошло не так. Попробуйте еще раз.");
      dispatch(resetOrderInfo());
    }
  }, [isOrderLoaded, isModal, showModal, isOrderLoadingError, dispatch]);

  const { bun, innerIngredients, totalPrice } = useMemo(() => {
    const { bun, inner: innerIngredients } = selectedIngredients;

    return {
      bun,
      innerIngredients,
      totalPrice: getBurgerTotalPrice(bun, innerIngredients),
    };
  }, [selectedIngredients]);

  const handleIngredientRemove = useCallback(
    (innerIngredient) => {
      console.log(innerIngredient.uniqueId);
      dispatch(removeSelectedIngredient(innerIngredient.uniqueId));
    },
    [dispatch]
  );

  const handleBurgerCheckoutClick = useCallback(() => {
    const order = {
      ingredients: [
        bun._id,
        ...innerIngredients.map((ingredient) => ingredient._id),
      ],
    };

    dispatch(getOrderInfo(order));
  }, [dispatch, bun, innerIngredients]);

  const handleCloseModal = () => {
    dispatch(resetOrderInfo());
    closeModal();
  };

  const modal = isModal && (
    <Modal onClose={handleCloseModal}>
      <OrderDetails orderNumber={orderNumber} />
    </Modal>
  );

  const [, dropIngredientTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      handleDrop(item);
    },
  });

  const handleDrop = (item) => {
    const dropped = item.item;
    if (dropped.type === "bun") {
      dispatch(setBun(dropped));
    } else {
      dispatch(addSelectedIngredient(dropped));
    }
  };

  return (
    <>
      <section
        className={`${styles.burgerConstructor} mt-25`}
        ref={dropIngredientTarget}
      >
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
            <InnerIngredient
              data={innerIngredient}
              handleRemove={handleIngredientRemove}
              key={innerIngredient.uniqueId}
            />
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
      {modal}
    </>
  );
};

export default BurgerConstructor;
