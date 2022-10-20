import { combineReducers } from "redux";
import ingredients from "../slicers/ingredientsSlice";
import order from "../slicers/orderSlice";
import selectedIngredients from "../slicers/selectedIngredientsSlice";
import selectedIngredientsTab from "../slicers/selectedIngredientsTabSlice";
import displayedIngredient from "../slicers/displayedIngredientSlice";

export const rootReducer = combineReducers({
  ingredients,
  order,
  selectedIngredients,
  selectedIngredientsTab,
  displayedIngredient,
});
