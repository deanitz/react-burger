import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { getStubSelectedIngredientIds } from "../../utils/stubDataUtils";
import { fetchIngredients } from "../../services/slicers/ingredientsSlice";
import { setSelectedIngredients } from "../../services/slicers/selectedIngredientsSlice";

const App = () => {
  const dispatch = useDispatch();

  const { ingredientsData, selectedIngredientsIds } = useSelector((store) => ({
    ingredientsData: store.ingredients.ingredientsData,
    selectedIngredientsIds: store.selectedIngredients.selectedIngredientsIds,
  }));

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (ingredientsData.length) {
      dispatch(
        setSelectedIngredients(getStubSelectedIngredientIds(ingredientsData))
      );
    }
  }, [dispatch, ingredientsData]);

  return (
    <>
      <AppHeader />
      {Boolean(ingredientsData.length && selectedIngredientsIds.length) && (
        <AppMain />
      )}
    </>
  );
};

export default App;
