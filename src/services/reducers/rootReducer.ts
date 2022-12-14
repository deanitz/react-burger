import { combineReducers } from "redux";
import ingredients from "../slices/ingredientsSlice";
import order from "../slices/orderSlice";
import ordersHistory from "../slices/ordersHistorySlice";
import ordersFeed from "../slices/ordersFeedSlice";
import orderDetails from "../slices/orderDetailsSlice";
import selectedIngredients from "../slices/selectedIngredientsSlice";
import selectedIngredientsTab from "../slices/selectedIngredientsTabSlice";
import resetPassword from "../slices/resetPasswordSlice";
import auth from "../slices/authSlice";
import profile from "../slices/profileSlice";
import profileText from "../slices/profileTextSlice";

export const rootReducer = combineReducers({
  ingredients,
  order,
  ordersHistory,
  ordersFeed,
  orderDetails,
  selectedIngredients,
  selectedIngredientsTab,
  resetPassword,
  auth,
  profile,
  profileText,
});
