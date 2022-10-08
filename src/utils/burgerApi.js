const API_URL = "https://norma.nomoreparties.space/api";

const checkReponse = (response) => {
    return response.ok
      ? response.json()
      : response.json().then((error) => Promise.reject(error));
  };

export const getIngredients = () => {
    return fetch(`${API_URL}/ingredients`)
     .then(checkReponse)
 }