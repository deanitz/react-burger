import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { fetchIngredients } from "../../services/slicers/ingredientsSlice";

const App = () => {
  const dispatch = useDispatch();

  const { ingredientsData } = useSelector((store) => ({
    ingredientsData: store.ingredients.ingredientsData,
  }));

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {Boolean(ingredientsData.length) && <AppMain />}
    </>
  );
};

export default App;
