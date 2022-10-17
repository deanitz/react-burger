import { combineReducers } from "redux";
import ingredients from "../slicers/ingredientsSlice";
import order from "../slicers/orderSlice";
import selectedIngredients from "../slicers/selectedIngredientsSlice";

export const rootReducer = combineReducers({
  ingredients,
  order,
  selectedIngredients,
});
