import { useMemo, useCallback, useEffect } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCheckout from "../BurgerCheckout/BurgerCheckout";
import OrderCheckoutDetails from "../OrderCheckoutDetails/OrderCheckoutDetails";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import { getBurgerTotalPrice } from "./BurgerConstructor.utils";
import { getOrderInfo, resetOrderInfo } from "../../services/slices/orderSlice";
import {
  addSelectedIngredient,
  removeSelectedIngredient,
  reorderSelectedIngredients,
  reset as resetIngredients,
  setBun,
} from "../../services/slices/selectedIngredientsSlice";
import InnerIngredient from "./InnerIngredient";
import { useDrop } from "react-dnd";
import { ROUTE_LOGIN } from "../../utils/routes";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import {
  Ingredient,
  IngredientTypes,
  OrderRequest,
} from "../../types/dataTypes";
import styles from "./BurgerConstructor.module.css";
import { IDropItem } from "../../types/utilityTypes";

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { orderNumber, isOrderLoaded, isOrderLoading, isOrderLoadingError } =
    useAppSelector(({ order }) => ({
      orderNumber: order.orderInfo?.number,
      isOrderLoaded:
        order.orderInfo && !order.orderInfoLoading && !order.orderInfoError,
      isOrderLoadingError: order.orderInfoError,
      isOrderLoading: order.orderInfoLoading,
    }));

  const selectedIngredients = useAppSelector(
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
      dispatch(resetIngredients());
      return;
    }
    if (isOrderLoadingError) {
      alert("???????????? ???????????????? ????????????. ???????????????????? ?????? ??????.");
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
    (innerIngredient: Ingredient) => {
      dispatch(removeSelectedIngredient(innerIngredient.uniqueId));
    },
    [dispatch]
  );

  const handleIngredientReorder = useCallback(
    (draggedIngredient: Ingredient, staticIngredient: Ingredient) => {
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
          "?????????? ?????????????????? ??????????, ?????????? ?????????? ?? ??????????????. ?????????????? ???? ???????????????? ???????????"
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

    const order: OrderRequest = {
      ingredients: [
        bun?._id!,
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
          <OrderCheckoutDetails orderNumber={orderNumber} />
        </Modal>
      ),
    [isModal, handleCloseModal, orderNumber]
  );

  const [, dropIngredientTarget] = useDrop({
    accept: bun
      ? [IngredientTypes.bun, IngredientTypes.sauce, IngredientTypes.main]
      : IngredientTypes.bun,
    drop(item: IDropItem<Ingredient>) {
      handleDrop(item);
    },
  });

  const handleDrop = useCallback(
    (item: IDropItem<Ingredient>) => {
      const dropped = item.item as Ingredient;
      if (dropped.type === IngredientTypes.bun) {
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
        <h2 className="text text_type_main-medium">???????????????????? ?????????? ????????</h2>
      </div>
    ),
    []
  );

  const burgerTop = useMemo(
    () =>
      bun && (
        <div className="ml-8" data-testid="burger-top">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (????????)`}
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
        <div className="ml-8" data-testid="burger-bottom">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (??????)`}
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
          data-testid="burger-inner"
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
            ???????????????????? ?????????? ?? ?????????????? ????????
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
        data-testid="drop-ingredient-target"
      >
        <div className={styles.selectedIngredientsContainer}>
          {isOrderLoading ? (
            <div className={styles.loader} />
          ) : bun ? (
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
