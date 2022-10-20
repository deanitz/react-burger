import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { fetchIngredients } from "../../services/slices/ingredientsSlice";

const App = () => {
  const dispatch = useDispatch();

  const { ingredientsData, ingredientsDataError } = useSelector((store) => ({
    ingredientsData: store.ingredients.ingredientsData,
    ingredientsDataError: store.ingredients.ingredientsDataError,
  }));

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (ingredientsDataError) {
      alert("Что-то пошло не так. Попробуйте еще раз.");
    }
  }, [ingredientsDataError]);

  return (
    <>
      <AppHeader />
      {Boolean(ingredientsData.length) && <AppMain />}
    </>
  );
};

export default App;
