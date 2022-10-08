import { useEffect, useState } from "react";
import { getIngredients } from "../../utils/burgerApi";
import { logError } from "../../utils/logUtils";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";

const App = () => {
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredientsData(data.data);
      })
      .catch((error) => {
        logError(error);
      });
  }, []);

  return (
    <>
      <AppHeader />
      {Boolean(ingredientsData.length) && (
        <AppMain ingredientsData={ingredientsData} />
      )}
    </>
  );
};

export default App;
