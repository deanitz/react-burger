import { useMemo } from "react";
import { OrderStatuses } from "../../types/dataTypes";
import { useAppSelector } from "../../utils/store";
import styles from "./OrdersFeedInfo.module.css";

const MAX_ORDER_NUMBERS = 10;

const OrdersFeedInfo = () => {
  const { orders, total, totalToday } = useAppSelector(({ ordersFeed }) => ({
    orders: ordersFeed.orders,
    total: ordersFeed.total,
    totalToday: ordersFeed.totalToday,
  }));

  const ordersDone = useMemo(() => {
    return orders
      .filter((order) => order.status === OrderStatuses.done)
      .slice(0, MAX_ORDER_NUMBERS)
      .map((order) => (
        <span
          key={order.number}
          className={`text text_type_digits-default ${styles.orderDone}`}
        >
          {order.number}
        </span>
      ));
  }, [orders]);

  const ordersPending = useMemo(() => {
    return orders
      .filter((order) => order.status === OrderStatuses.pending)
      .slice(0, MAX_ORDER_NUMBERS)
      .map((order) => (
        <span
          key={order.number}
          className={`text text_type_digits-default ${styles.orderPending}`}
        >
          {order.number}
        </span>
      ));
  }, [orders]);

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.orderNumbersContainer}>
        <div>
          <h2 className="text text_type_main-medium mb-6">Готовы</h2>
          <div className={styles.orderNumbersGrid}>{ordersDone}</div>
        </div>
        <div>
          <h2 className="text text_type_main-medium mb-6">В работе</h2>
          <div className={styles.orderNumbersGrid}>{ordersPending}</div>
        </div>
      </div>
      <div>
        <h2 className="text text_type_main-medium mt-6">
          Выполнено за все время:
        </h2>
        <span className={`text text_type_digits-large ${styles.glowingNumber}`}>
          {total}
        </span>
      </div>
      <div>
        <h2 className="text text_type_main-medium mt-6">
          Выполнено за сегодня:
        </h2>
        <span className={`text text_type_digits-large ${styles.glowingNumber}`}>
          {totalToday}
        </span>
      </div>
    </section>
  );
};

export default OrdersFeedInfo;
