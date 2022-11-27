import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient, OrderData } from "../../types/dataTypes";
import { useAppSelector } from "../../utils/store";

import styles from "./OrdersHistoryItem.module.css";

export type OrdersHistoryItemProps = {
  order: OrderData;
};

const OrdersHistoryItem = ({ order }: OrdersHistoryItemProps) => {
  const { ingredientsDataStub } = useAppSelector(({ ingredients }) => ({
    ingredientsDataStub: ingredients.ingredientsData.slice(2, 7),
  }));

  const smallIngredientIcon = (ingredient: Ingredient) => (
    <div className={styles.smallIngredientIcon} key={ingredient._id}>
      <img
        className={styles.smallIngredientIconImage}
        src={ingredient.image_mobile}
        alt={`изображение ингредиента "${ingredient.name}"`}
      />
    </div>
  );

  const total = (
    <p className="text text_type_digits-medium mr-10">
      <span className="mr-2">{/*total*/}1983</span>
      <CurrencyIcon type="primary" />
    </p>
  );

  return (
    <section className={styles.contentContainer}>
      <div className={styles.spacedLineContainer}>
        <span className="text_type_digits-default">#{order.number}</span>
        <span className="text text_type_main-default text_color_inactive">
          Сегодня, 13:20 i-GMT+3
        </span>
      </div>
      <span className="text text_type_main-medium mt-6">{order.name}</span>
      <span className="text text_type_main-small mt-2 mb-6">Выполнен</span>
      <div className={styles.spacedLineContainer}>
        <div className={styles.ingredientsContainer}>
          {ingredientsDataStub.map((ingredient) =>
            smallIngredientIcon(ingredient)
          )}
        </div>
        {total}
      </div>
    </section>
  );
};

export default OrdersHistoryItem;
