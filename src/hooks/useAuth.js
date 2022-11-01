import { getAccessToken, getRefreshToken } from "../utils/localStorageUtils";

export function useAuth() {
  const user = {
    isAuthenticated: Boolean(getAccessToken() && getRefreshToken()),
  };

  return {
    user,
  };
}
