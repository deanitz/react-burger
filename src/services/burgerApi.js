const API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : response.json().then((error) => Promise.reject(error));
};

export const getIngredients = () => {
  return fetch(`${API_URL}/ingredients`).then(checkResponse);
};

export const placeOrder = (order) => {
  return fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  }).then(checkResponse);
};

export const resetPassword = (email) => {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  }).then(checkResponse);
};
