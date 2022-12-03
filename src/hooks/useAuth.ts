import { getAccessToken, getRefreshToken } from "../utils/localStorageUtils";

export function useAuth() {
  const accessToken = getAccessToken();
  const user = {
    isAuthenticated: Boolean(accessToken && getRefreshToken()),
    accessToken: accessToken,
  };

  return {
    user,
  };
}
