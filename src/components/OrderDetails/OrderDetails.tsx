import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadOrder } from "../../services/actions/orderStorageActions";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import styles from "./OrderDetails.module.css";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!params.id) {
      return;
    }
    dispatch(loadOrder(params.id));
  }, [dispatch, params.id]);

  const { order } = useAppSelector(({ orderDetails }) => ({
    order: orderDetails.orderData,
  }));
  
  return <div className={`${styles.totalContainer} mt-10 mr-8`}>Пока так: {order?.name}</div>;
};

export default OrderDetails;
