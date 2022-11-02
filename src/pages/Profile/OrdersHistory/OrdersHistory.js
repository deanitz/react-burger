import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInfoText } from "../../../services/slices/profileTextSlice";

const OrdersHistory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setInfoText(
        'В этом разделе вы можете подождать, пока будет реализована функциональность "История Заказов"'
      )
    );
  }, [dispatch]);

  return <h1 className="text text_type_main-medium mt-10">История заказов</h1>;
};

export default OrdersHistory;
