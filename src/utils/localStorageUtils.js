const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

const extractToken = (stringValue) => {
  return stringValue.split("Bearer ")[1];
};

export const storeTokens = (response) => {
  if (response.accessToken) {
    localStorage.setItem(ACCESS_TOKEN, extractToken(response.accessToken));
  }
  if (response.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN, response.refreshToken);
  }
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);
