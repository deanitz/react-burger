import { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";

const ingredientsApiUrl = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    fetch(ingredientsApiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIngredientsData(data.data);
      })
      .catch((error) => {
        logError(error);
      });
  }, []);

  const logError = (error) => {
    console.error("Ошибка:", error);
  };

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
