import { combineReducers } from "redux";
import ingredients from "../slices/ingredientsSlice";
import order from "../slices/orderSlice";
import selectedIngredients from "../slices/selectedIngredientsSlice";
import selectedIngredientsTab from "../slices/selectedIngredientsTabSlice";
import displayedIngredient from "../slices/displayedIngredientSlice";

export const rootReducer = combineReducers({
  ingredients,
  order,
  selectedIngredients,
  selectedIngredientsTab,
  displayedIngredient,
});
