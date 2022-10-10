import { useEffect, useState } from "react";
import { getIngredients } from "../../utils/burgerApi";
import { logError } from "../../utils/logUtils";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { getStubSelectedIngredientIds } from "../../utils/stubDataUtils";

const App = () => {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [selectedIngredientsIds, setSelectedIngredientsIds] = useState([]);

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredientsData(data.data);
        // Стабовые данные
        setSelectedIngredientsIds(getStubSelectedIngredientIds(data.data));
      })
      .catch((error) => {
        logError(error);
      });
  }, []);

  return (
    <>
      <AppHeader />
      {Boolean(ingredientsData.length) && (
        <AppMain
          ingredientsData={ingredientsData}
          selectedIngredientsIds={selectedIngredientsIds}
        />
      )}
    </>
  );
};

export default App;
