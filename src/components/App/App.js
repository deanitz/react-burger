import { useEffect, useState } from "react";
import { getIngredients } from "../../services/burgerApi";
import { logError } from "../../services/logService";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { getStubSelectedIngredientIds } from "../../utils/stubDataUtils";
import {
  AllIngredientsContext,
  SelectedIngredientsContext,
} from "../../services/appContext";

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
        <AllIngredientsContext.Provider value={{ ingredientsData }}>
          <SelectedIngredientsContext.Provider
            value={{ selectedIngredientsIds, setSelectedIngredientsIds }}
          >
            <AppMain />
          </SelectedIngredientsContext.Provider>
        </AllIngredientsContext.Provider>
      )}
    </>
  );
};

export default App;
