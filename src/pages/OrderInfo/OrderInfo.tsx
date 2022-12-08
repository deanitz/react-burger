import OrderDetails from "../../components/OrderDetails/OrderDetails";
import OrderDetailsHeader from "../../components/OrderDetailsHeader/OrderDetailsHeader";
import PageLayout from "../../components/PageLayout/PageLayout";

const OrderInfo = () => {
  return (
    <PageLayout>
      <OrderDetailsHeader />
      <OrderDetails />
    </PageLayout>
  );
};

export default OrderInfo;
