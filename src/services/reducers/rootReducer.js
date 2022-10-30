import { combineReducers } from "redux";
import ingredients from "../slices/ingredientsSlice";
import order from "../slices/orderSlice";
import selectedIngredients from "../slices/selectedIngredientsSlice";
import selectedIngredientsTab from "../slices/selectedIngredientsTabSlice";
import displayedIngredient from "../slices/displayedIngredientSlice";
import resetPassword from "../slices/resetPasswordSlice";
import auth from "../slices/authSlice";
import profile from "../slices/profileSlice";

export const rootReducer = combineReducers({
  ingredients,
  order,
  selectedIngredients,
  selectedIngredientsTab,
  displayedIngredient,
  resetPassword,
  auth,
  profile,
});
