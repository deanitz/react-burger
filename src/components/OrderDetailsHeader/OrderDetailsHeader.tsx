import { useAppSelector } from "../../utils/store";

const OrderDetailsHeader = () => {
  const { order } = useAppSelector(({ orderDetails }) => ({
    order: orderDetails.orderData,
  }));

  return (
    <h1 className="text text_type_digits-default mb-10">#{order?.number}</h1>
  );
};

export default OrderDetailsHeader;
