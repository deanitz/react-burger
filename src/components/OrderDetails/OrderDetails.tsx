import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadOrder } from "../../services/actions/orderStorageActions";
import { resetOrder } from "../../services/slices/orderDetailsSlice";
import {
  Ingredient,
  OrderStatuses,
  OrderStatusesDescriptions,
} from "../../types/dataTypes";
import { IUniqueId } from "../../types/utilityTypes";
import { addUniqueId, getUniqueIdObject } from "../../utils/dataUtils";
import { getDateDescription } from "../../utils/dateTimeUtils";
import { ROUTE_NOT_FOUND } from "../../utils/routes";
import { sortBunFirst } from "../../utils/sortUtils";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import styles from "./OrderDetails.module.css";

const OrderStatusesClasses = new Map<string, string>([
  [OrderStatuses.created, styles.statusCreated],
  [OrderStatuses.pending, styles.statusPending],
  [OrderStatuses.done, styles.statusDone],
  [OrderStatuses.cancelled, styles.statusCancelled],
]);

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!params.id) {
      return;
    }

    dispatch(loadOrder(params.id));

    return () => {
      dispatch(resetOrder());
    };
  }, [dispatch, params.id]);

  const { order, isOrderLoaded } = useAppSelector(({ orderDetails }) => ({
    order: orderDetails.orderData,
    isOrderLoaded: orderDetails.isOrderLoaded,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (isOrderLoaded && !order) {
      navigate(ROUTE_NOT_FOUND, { replace: false });
    }
  }, [order, isOrderLoaded, navigate]);

  const { ingredientsData } = useAppSelector(({ ingredients }) => ({
    ingredientsData: order
      ? order.ingredients
          .map((ingredientId) =>
            ingredients.ingredientsData.find((i) => i._id === ingredientId)
          )
          .map((ingredient) =>
            ingredient ? addUniqueId(ingredient) : getUniqueIdObject()
          )
          .sort(sortBunFirst)
      : [],
  }));

  const status = order && (
    <span
      className={`text text_type_main-small mt-3 ${OrderStatusesClasses.get(
        order.status
      )}`}
    >
      {OrderStatusesDescriptions.get(order.status)}
    </span>
  );

  const ingredientRow = (ingredient: Ingredient) => (
    <div className={`${styles.ingredientRow} mr-6`}>
      <div className={styles.ingredientRowLeft}>
        <div className={styles.smallIngredientIcon} key={ingredient.uniqueId}>
          <img
            className={styles.smallIngredientIconImage}
            src={(ingredient as Ingredient)?.image_mobile}
            alt={`изображение ингредиента "${
              (ingredient as Ingredient)?.name ?? "не найдено"
            }"`}
          />
        </div>
        <span className="text text_type_main-small ml-4">
          {ingredient.name}
        </span>
      </div>
      <div className={`${styles.total} text text_type_digits-default mr-10`}>
        <span>1x</span>
        <span className="mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );

  //TODO types
  const ingredients = useMemo(
    () => (
      <div className={`${styles.ingredientsContainer} custom-scroll mt-6`}>
        {ingredientsData.map((ingredient: Ingredient | IUniqueId) =>
          ingredientRow(ingredient as Ingredient)
        )}
      </div>
    ),
    [ingredientsData]
  );

  const total = useMemo(() => {
    const totalPrice = ingredientsData.reduce(
      (acc, cur) => (acc += (cur as Ingredient)?.price ?? 0),
      0
    );
    return (
      <div className={`${styles.total} text text_type_digits-default mr-10`}>
        <span className="mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
    );
  }, [ingredientsData]);

  return order ? (
    <section className={styles.contentContainer}>
      <span className="text text_type_main-medium">{order.name}</span>
      {status}
      <div className="mt-15 mb-6">
        <span className="text text_type_main-medium">Состав:</span>
        {ingredients}
      </div>
      <div className={`${styles.spacedLineContainer} mt-6`}>
        <span className="text text_type_main-default text_color_inactive">
          {getDateDescription(order.updatedAt)}
        </span>
        {total}
      </div>
    </section>
  ) : (
    <></>
  );
};

export default OrderDetails;
