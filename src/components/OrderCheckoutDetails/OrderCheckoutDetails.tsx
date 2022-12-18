import doneImage from "../../images/done.png";

import styles from "./OrderCheckoutDetails.module.css";

export type OrderCheckoutDetailsProps = { orderNumber?: string | number };

const OrderCheckoutDetails = ({ orderNumber }: OrderCheckoutDetailsProps) => {
  return (
    <div
      className={styles.orderModalContentContainer}
      data-testid="order-checkout-details"
    >
      <h1
        className={`${styles.orderModalNumber} text text_type_digits-large ml-15 mr-15`}
      >
        {orderNumber}
      </h1>
      <h2 className="text text_type_main-medium mt-8">идентификатор заказа</h2>
      <img
        src={doneImage}
        alt="иконка подтверждения заказа"
        className={`${styles.orderModalImage} mt-15 mb-15`}
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderCheckoutDetails;
