import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import {
  Ingredient,
  OrderData,
  OrderStatuses,
  OrderStatusesDescriptions,
} from "../../types/dataTypes";
import { IUniqueId } from "../../types/utilityTypes";
import { addUniqueId, getUniqueIdObject } from "../../utils/dataUtils";
import { getDateDescription } from "../../utils/dateTimeUtils";
import { sortBunFirst } from "../../utils/collectionUtils";
import { useAppSelector } from "../../utils/store";

import styles from "./OrdersHistoryItem.module.css";

const DISPLAYED_INGREDIENTS = 5;

const OrderStatusesClasses = new Map<string, string>([
  [OrderStatuses.created, styles.statusCreated],
  [OrderStatuses.pending, styles.statusPending],
  [OrderStatuses.done, styles.statusDone],
  [OrderStatuses.cancelled, styles.statusCancelled],
]);

export type OrdersHistoryItemProps = {
  order: OrderData;
  showStatus?: boolean;
};

const OrdersHistoryItem = ({
  order,
  showStatus = true,
}: OrdersHistoryItemProps) => {
  const { ingredientsData } = useAppSelector(({ ingredients }) => ({
    ingredientsData: order.ingredients
      .map((ingredientId) =>
        ingredients.ingredientsData.find((i) => i._id === ingredientId)
      )
      .map((ingredient) =>
        (ingredient ? addUniqueId(ingredient) : getUniqueIdObject()) as IUniqueId | Ingredient
      )
      .sort(sortBunFirst),
  }));

  const smallIngredientIcon = (ingredient: Ingredient | IUniqueId) => (
    <div className={styles.smallIngredientIcon} key={ingredient.uniqueId}>
      <img
        className={styles.smallIngredientIconImage}
        src={(ingredient as Ingredient)?.image_mobile}
        alt={`изображение ингредиента "${
          (ingredient as Ingredient)?.name ?? "не найдено"
        }"`}
      />
    </div>
  );

  const moreIngredientsElement = (
    ingredient: Ingredient | IUniqueId,
    elementsMoreCount: number
  ) => (
    <div className={styles.smallIngredientIcon} key={ingredient.uniqueId}>
      <span className={`text text_type_digits-medium ${styles.moreText}`}>
        +{elementsMoreCount}
      </span>
      <div className={styles.more}>
        <img
          className={`${styles.smallIngredientIconImage}`}
          src={(ingredient as Ingredient)?.image_mobile}
          alt={`изображение ингредиента "${
            (ingredient as Ingredient)?.name ?? "не найдено"
          }"`}
        />
      </div>
    </div>
  );

  const ingredientsRoundIcons = useMemo(() => {
    const displayedIngredients = ingredientsData.slice(
      0,
      DISPLAYED_INGREDIENTS
    );
    const elements = displayedIngredients
      .map((ingredient: Ingredient | IUniqueId) =>
        smallIngredientIcon(ingredient)
      )
      .reverse();
    if (ingredientsData.length > DISPLAYED_INGREDIENTS) {
      elements.unshift(
        moreIngredientsElement(
          ingredientsData[DISPLAYED_INGREDIENTS],
          ingredientsData.length - DISPLAYED_INGREDIENTS
        )
      );
    }

    return elements;
  }, [ingredientsData]);

  const total = useMemo(() => {
    const totalPrice = ingredientsData.reduce(
      (acc, cur) => (acc += (cur as Ingredient)?.price ?? 0),
      0
    );
    return (
      <p className="text text_type_digits-medium mr-10">
        <span className="mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </p>
    );
  }, [ingredientsData]);

  const status = (
    <span
      className={`text text_type_main-small mt-2 ${OrderStatusesClasses.get(
        order.status
      )}`}
    >
      {OrderStatusesDescriptions.get(order.status)}
    </span>
  );

  return (
    <section className={styles.contentContainer}>
      <div className={styles.spacedLineContainer}>
        <span className="text_type_digits-default">#{order.number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {getDateDescription(order.updatedAt)}
        </span>
      </div>
      <span className="text text_type_main-medium mt-6">{order.name}</span>
      {showStatus && status}
      <div className={`${styles.spacedLineContainer} mt-6`}>
        <div className={styles.ingredientsContainer}>
          {ingredientsRoundIcons}
        </div>
        {total}
      </div>
    </section>
  );
};

export default OrdersHistoryItem;
