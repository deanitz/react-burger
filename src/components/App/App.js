import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { getDefaultSelectedIngredients } from "../../utils/dataUtils";
import { fetchIngredients } from "../../services/slicers/ingredientsSlice";
import { setSelectedIngredients } from "../../services/slicers/selectedIngredientsSlice";

const App = () => {
  const dispatch = useDispatch();

  const { ingredientsData, selectedIngredients } = useSelector((store) => ({
    ingredientsData: store.ingredients.ingredientsData,
    selectedIngredients: store.selectedIngredients.selectedIngredients,
  }));

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (ingredientsData.length) {
      dispatch(
        setSelectedIngredients(getDefaultSelectedIngredients(ingredientsData))
      );
    }
  }, [dispatch, ingredientsData]);

  return (
    <>
      <AppHeader />
      {Boolean(
        ingredientsData.length &&
          selectedIngredients.bun &&
          selectedIngredients.inner.length
      ) && <AppMain />}
    </>
  );
};

export default App;
