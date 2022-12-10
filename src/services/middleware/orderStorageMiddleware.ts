import { AnyAction, Middleware } from "@reduxjs/toolkit";
import {
  loadFromStoredOrders,
  storeOrders,
} from "../../utils/localStorageUtils";
import { RootState } from "../../utils/store";
import { loadOrder, saveOrders } from "../actions/orderStorageActions";
import { setOrder } from "../slices/orderDetailsSlice";

export const createOrderStorageMiddleware = (): Middleware<{}, RootState> => {
  return (store) => (next) => (action: AnyAction) => {
    const { dispatch } = store;
    const { payload } = action;

    if (saveOrders.match(action)) {
      storeOrders(payload);
    }
    if (loadOrder.match(action)) {
      const order = loadFromStoredOrders(payload);
      dispatch(setOrder(order));
    }

    next(action);
  };
};
