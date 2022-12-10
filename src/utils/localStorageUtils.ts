import { logError } from "../services/logService";
import { OrderData, OrdersMessageData } from "../types/dataTypes";

const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const ORDERS = "ORDERS";

const extractToken = (headerValue: string) => {
  return headerValue.split("Bearer ")[1];
};

export interface ITokensBody {
  accessToken: string;
  refreshToken: string;
}

export const storeTokens = (response: ITokensBody) => {
  if (response.accessToken) {
    localStorage.setItem(ACCESS_TOKEN, extractToken(response.accessToken));
  }
  if (response.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN, response.refreshToken);
  }
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

export const storeOrders = (ordersMessageData: OrdersMessageData) => {
  if (!ordersMessageData.orders) {
    logError("Ошибка записи в localStorage");
    return;
  }
  localStorage.setItem(ORDERS, JSON.stringify(ordersMessageData.orders));
};

export const loadFromStoredOrders = (id: string) => {
  const ordersRaw = localStorage.getItem(ORDERS);
  if (!ordersRaw) {
    return undefined;
  }
  const orders = JSON.parse(ordersRaw) as Array<OrderData>;
  if (!orders) {
    return undefined;
  }

  return orders.find((order) => order._id === id);
};
