import { useEffect } from "react";
import OrdersHistoryItem from "../../components/OrdersHistoryItem/OrdersHistoryItem";
import { setInfoText } from "../../services/slices/profileTextSlice";
import {
  connect as ordersFeedConnect,
  disconnect as ordersFeedDisconnect,
} from "../../services/slices/ordersFeedSlice";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import styles from "./OrdersFeed.module.css";
import { WebsocketStatus } from "../../types/utilityTypes";

const ORDERS_FEED_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

const OrdersFeed = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector(({ ordersFeed }) => ({
    orders: ordersFeed.orders,
    status: ordersFeed.status,
  }));

  useEffect(() => {
    dispatch(ordersFeedConnect(ORDERS_FEED_SERVER_URL));
    return () => {
      dispatch(ordersFeedDisconnect());
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
      <div className={`${styles.pageInnerContainer} `}>
        <h1 className="text text_type_main-large mt-10 mb-5 ml-5">
          Лента заказов
        </h1>

        <div className={`${styles.contentContainer}`}>
          {status === WebsocketStatus.ONLINE ? (
            <section
              className={`${styles.ordersListContainer} custom-scroll mt-2 pl-5 pr-2`}
            >
              {orders?.slice().map((order) => (
                <OrdersHistoryItem
                  order={order}
                  key={order.number}
                  showStatus={false}
                />
              ))}
            </section>
          ) : (
            <span className="text text_type_main-small">{status}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersFeed;
