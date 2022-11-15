import { useEffect } from "react";
import { setInfoText } from "../../../services/slices/profileTextSlice";
import { useAppDispatch } from "../../../utils/store";

const OrdersHistory = () => {
  const dispatch = useAppDispatch();
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
