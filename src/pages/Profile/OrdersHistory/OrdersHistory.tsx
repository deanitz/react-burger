import { useEffect } from "react";
import OrdersHistoryItem from "../../../components/OrdersHistoryItem/OrdersHistoryItem";
import { setInfoText } from "../../../services/slices/profileTextSlice";
import {
  connect as ordersHistoryConnect,
  disconnect as ordersHistoryDisconnect,
} from "../../../services/slices/ordersHistorySlice";
import { useAppDispatch, useAppSelector } from "../../../utils/store";
import styles from "./OrdersHistory.module.css";
import { useAuth } from "../../../hooks/useAuth";
import { WebsocketStatus } from "../../../types/utilityTypes";
import { Link, useLocation } from "react-router-dom";

const ORDERS_HISTORY_SERVER_URL = "wss://norma.nomoreparties.space/orders";

const OrdersHistory = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { orders, status } = useAppSelector(({ ordersHistory }) => ({
    orders: ordersHistory.orders,
    status: ordersHistory.status,
  }));

  useEffect(() => {
    dispatch(
      ordersHistoryConnect(
        `${ORDERS_HISTORY_SERVER_URL}?token=${user.accessToken}`
      )
    );
    return () => {
      dispatch(ordersHistoryDisconnect());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Подключение и отключение требуется исключительно при монтировании и размонтировании компонента.

  useEffect(() => {
    dispatch(
      setInfoText("В этом разделе вы можете просмотреть свою историю заказов")
    );
  }, [dispatch]);

  return (
    <div className={`${styles.pageContainer}`}>
      {status === WebsocketStatus.ONLINE ? (
        <div
          className={`${styles.ordersListContainer} custom-scroll mt-2 pr-2`}
        >
          {orders
            ?.slice()
            .reverse()
            .map((order) => (
              <Link
                    to={`${location.pathname}/${order._id}`}
                    state={{
                      background: location,
                    }}
                    className={styles.link}
                  >
                      <OrdersHistoryItem order={order} key={order.number} />
                  </Link>
              
            ))}
        </div>
      ) : (
        <span className="text text_type_main-small">{status}</span>
      )}
    </div>
  );
};

export default OrdersHistory;
