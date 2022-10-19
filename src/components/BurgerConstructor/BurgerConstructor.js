import { useMemo, useCallback, useEffect } from "react";
import {
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCheckout from "../BurgerCheckout/BurgerCheckout";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import {
  getSplittedIngredientsData,
  getBurgerTotalPrice,
} from "./BurgerConstructor.utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderInfo,
  resetOrderInfo,
} from "../../services/slicers/orderSlice";
import {
  addSelectedIngredient,
  removeSelectedIngredient,
  updateSelectedIngredients,
} from "../../services/slicers/selectedIngredientsSlice";

import styles from "./BurgerConstructor.module.css";
import InnerIngredient from "./InnerIngredient";

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

  const { ingredientsData } = useSelector((store) => ({
    ingredientsData: store.ingredients.ingredientsData,
  }));

  const { selectedIngredientsIds } = useSelector((store) => ({
    selectedIngredientsIds: store.selectedIngredients.selectedIngredientsIds,
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

  const handleIngredientRemove = useCallback(
    (innerIngredient) => {
      dispatch(removeSelectedIngredient(innerIngredient._id));
    },
    [dispatch]
  );

  const handleBurgerCheckoutClick = useCallback(() => {
    const order = {
      ingredients: selectedIngredientsIds,
    };

    dispatch(getOrderInfo(order));
  }, [selectedIngredientsIds, dispatch]);

  const handleCloseModal = () => {
    dispatch(resetOrderInfo());
    closeModal();
  };

  const modal = isModal && (
    <Modal onClose={handleCloseModal}>
      <OrderDetails orderNumber={orderNumber} />
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
