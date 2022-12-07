import { createAction } from "@reduxjs/toolkit";
import { OrdersMessageData } from "../../types/dataTypes";

export const saveOrders = createAction<OrdersMessageData, "SAVE_ORDERS">(
  "SAVE_ORDERS"
);
export const loadOrder = createAction<string, "LOAD_ORDER">("LOAD_ORDER");
