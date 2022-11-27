import { useEffect } from "react";
import OrdersHistoryItem from "../../../components/OrdersHistoryItem/OrdersHistoryItem";
import { setInfoText } from "../../../services/slices/profileTextSlice";
import { OrderData } from "../../../types/dataTypes";
import { useAppDispatch, useAppSelector } from "../../../utils/store";

import styles from "./OrdersHistory.module.css";

const OrdersHistory = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setInfoText("В этом разделе вы можете просмотреть свою историю заказов")
    );
  }, [dispatch]);

  const { orders } = useAppSelector(({ ordersHistory }) => ({
    orders: ordersHistory.orders,
  }));

  return (
    <div className={`${styles.ordersListContainer} custom-scroll mt-10 pr-2`}>
      {orders.map((order) => (
        <OrdersHistoryItem
          order={order as OrderData}
          key={(order as OrderData).number}
        />
      ))}
    </div>
  );
};

export default OrdersHistory;
