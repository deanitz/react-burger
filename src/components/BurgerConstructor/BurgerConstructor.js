import { useMemo, useCallback, useEffect } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCheckout from "../BurgerCheckout/BurgerCheckout";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import { getBurgerTotalPrice } from "./BurgerConstructor.utils";
import { useDispatch, useSelector } from "react-redux";
import { getOrderInfo, resetOrderInfo } from "../../services/slices/orderSlice";
import {
  addSelectedIngredient,
  removeSelectedIngredient,
  reorderSelectedIngredients,
  setBun,
} from "../../services/slices/selectedIngredientsSlice";
import InnerIngredient from "./InnerIngredient";
import { useDrop } from "react-dnd";
import { TYPE_BUN, TYPE_SAUCE, TYPE_MAIN } from "../../utils/dataUtils";
import { ROUTE_LOGIN } from "../../utils/routes";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { orderNumber, isOrderLoaded, isOrderLoading, isOrderLoadingError } =
    useSelector(({ order }) => ({
      orderNumber: order.orderInfo?.number,
      isOrderLoaded:
        order.orderInfo && !order.orderInfoLoading && !order.orderInfoError,
      isOrderLoadingError: order.orderInfoError,
      isOrderLoading: order.orderInfoLoading,
    }));

  const selectedIngredients = useSelector(
    ({ selectedIngredients }) => selectedIngredients
  );

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
      alert("Ошибка создания заказа. Попробуйте еще раз.");
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
      dispatch(removeSelectedIngredient(innerIngredient.uniqueId));
    },
    [dispatch]
  );

  const handleIngredientReorder = useCallback(
    (draggedIngredient, staticIngredient) => {
      if (draggedIngredient === staticIngredient) {
        return;
      }
      dispatch(
        reorderSelectedIngredients({ draggedIngredient, staticIngredient })
      );
    },
    [dispatch]
  );

  const handleBurgerCheckoutClick = useCallback(() => {
    if (!user.isAuthenticated) {
      if (
        !window.confirm(
          "Чтобы совершить заказ, нужно войти в систему. Перейти на страницу входа?"
        )
      ) {
        return;
      }
      navigate(ROUTE_LOGIN, {
        replace: false,
        state: { returnPath: pathname },
      });
      return;
    }

    const order = {
      ingredients: [
        bun._id,
        ...innerIngredients.map((ingredient) => ingredient._id),
      ],
    };

    dispatch(getOrderInfo(order));
  }, [dispatch, bun, innerIngredients, navigate, pathname, user]);

  const handleCloseModal = useCallback(() => {
    dispatch(resetOrderInfo());
    closeModal();
  }, [dispatch, closeModal]);

  const modal = useMemo(
    () =>
      isModal && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      ),
    [isModal, handleCloseModal, orderNumber]
  );

  const [, dropIngredientTarget] = useDrop({
    accept: bun ? [TYPE_BUN, TYPE_SAUCE, TYPE_MAIN] : TYPE_BUN,
    drop(item) {
      handleDrop(item);
    },
  });

  const handleDrop = useCallback(
    (item) => {
      const dropped = item.item;
      if (dropped.type === TYPE_BUN) {
        dispatch(setBun(dropped));
      } else {
        dispatch(addSelectedIngredient(dropped));
      }
    },
    [dispatch]
  );

  const placeholder = useMemo(
    () => (
      <div className={`${styles.placeholder} ${styles.minBunHeight}`}>
        <h2 className="text text_type_main-medium">Перетащите булку сюда</h2>
      </div>
    ),
    []
  );

  const burgerTop = useMemo(
    () =>
      bun && (
        <div className="ml-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ),
    [bun]
  );

  const burgerBottom = useMemo(
    () =>
      bun && (
        <div className="ml-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ),
    [bun]
  );

  const isCheckoutDisabled = useMemo(
    () => isOrderLoading || !bun || !innerIngredients.length,
    [isOrderLoading, bun, innerIngredients]
  );

  const burgerInner = useMemo(
    () =>
      innerIngredients && innerIngredients.length ? (
        <div
          className={`${styles.innerIngredientsListContainer} custom-scroll mt-4 mb-4`}
        >
          {innerIngredients.map((innerIngredient) => (
            <InnerIngredient
              data={innerIngredient}
              handleRemove={handleIngredientRemove}
              handleReorder={handleIngredientReorder}
              key={innerIngredient.uniqueId}
            />
          ))}
        </div>
      ) : (
        <div className={`${styles.placeholder} mt-4 mb-4 ml-10 mr-10`}>
          <h2 className="text text_type_main-medium">
            Перетащите соусы и начинки сюда
          </h2>
        </div>
      ),
    [innerIngredients, handleIngredientRemove, handleIngredientReorder]
  );

  return (
    <>
      <section
        className={`${styles.burgerConstructor} mt-25 mb-25`}
        ref={dropIngredientTarget}
      >
        <div className={styles.selectedIngredientsContainer}>
          {bun ? (
            <>
              {burgerTop}
              {burgerInner}
              {burgerBottom}
            </>
          ) : (
            placeholder
          )}
        </div>
        <BurgerCheckout
          total={totalPrice}
          onOrderClick={handleBurgerCheckoutClick}
          disabled={isCheckoutDisabled}
        />
      </section>
      {modal}
    </>
  );
};

export default BurgerConstructor;
