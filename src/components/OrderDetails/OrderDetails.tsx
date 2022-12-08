import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadOrder } from "../../services/actions/orderStorageActions";
import { resetOrder } from "../../services/slices/orderDetailsSlice";
import {
  IngredientWithCount,
  OrderStatuses,
  OrderStatusesDescriptions,
} from "../../types/dataTypes";
import { getDateDescription } from "../../utils/dateTimeUtils";
import { ROUTE_NOT_FOUND } from "../../utils/routes";
import { sortBunFirst } from "../../utils/collectionUtils";
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

  const { ingredientsData, allIngredients } = useAppSelector(({ ingredients }) => ({
    allIngredients: ingredients.ingredientsData,
    ingredientsData: order
      ? order.ingredients
          .map((ingredientId) => ({
            ingredient: ingredients.ingredientsData.find((i) => i._id === ingredientId),
            count: 1
          }))
          .reduce((acc: Array<IngredientWithCount>, cur: IngredientWithCount) => {
            const stored = acc.find(el => el.ingredient?._id === cur.ingredient?._id);
            if (stored) {
              stored.count += 1;
              return acc;
            }
            return [...acc, cur];
          }, [])
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

  const ingredientRow = (item: IngredientWithCount) => (
    <div className={`${styles.ingredientRow} mr-6`} key={item.ingredient?._id}>
      <div className={styles.ingredientRowLeft}>
        <div className={styles.smallIngredientIcon}>
          <img
            className={styles.smallIngredientIconImage}
            src={item.ingredient?.image_mobile}
            alt={`изображение ингредиента "${
              item.ingredient?.name ?? "не найдено"
            }"`}
          />
        </div>
        <span className="text text_type_main-small ml-4">
          {item.ingredient?.name}
        </span>
      </div>
      <div className={`${styles.total} text text_type_digits-default mr-10 ml-4`}>
        <span>{item.count}x</span>
        <span className="mr-2">{item.ingredient?.price}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );

  const ingredients = 
    () => (
      <div className={`${styles.ingredientsContainer} custom-scroll mt-6`}>
        {ingredientsData.map((ingredient: IngredientWithCount) =>
          ingredientRow(ingredient)
        )}
      </div>
    )
  ;

  const total = useMemo(() => {
    const totalPrice = ingredientsData.reduce(
      (acc, cur) => (acc += cur.ingredient ? cur.ingredient.price * cur.count : 0),
      0
    );
    return (
      <div className={`${styles.total} text text_type_digits-default mr-10`}>
        <span className="mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
    );
  }, [ingredientsData]);

  return order && allIngredients.length ? (
    <section className={styles.contentContainer}>
      <span className="text text_type_main-medium">{order.name}</span>
      {status}
      <div className="mt-15 mb-6">
        <span className="text text_type_main-medium">Состав:</span>
        {ingredients()}
      </div>
      <div className={`${styles.spacedLineContainer} mt-6`}>
        <span className="text text_type_main-default text_color_inactive">
          {getDateDescription(order.updatedAt)}
        </span>
        {total}
      </div>
    </section>
  ) : (
    <div>Загрузка...</div>
  );
};

export default OrderDetails;
