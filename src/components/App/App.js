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
import { rootReducer } from "../../services/reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

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
        <Provider store={store}>
          <AllIngredientsContext.Provider value={{ ingredientsData }}>
            <SelectedIngredientsContext.Provider
              value={{ selectedIngredientsIds, setSelectedIngredientsIds }}
            >
              <AppMain />
            </SelectedIngredientsContext.Provider>
          </AllIngredientsContext.Provider>
        </Provider>
      )}
    </>
  );
};

export default App;
