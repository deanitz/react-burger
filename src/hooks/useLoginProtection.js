import { Navigate, useLocation } from "react-router-dom";
import { ROUTE_ROOT } from "../utils/routes";
import { useAuth } from "./useAuth";

export function useLoginProtection() {
  const { user } = useAuth();
  const { state: locationState } = useLocation();

  const navigateIfLoggedIn = () =>
    user.isAuthenticated && (
      <Navigate to={locationState?.returnPath || ROUTE_ROOT} replace={false} />
    );

  return {
    navigateIfLoggedIn,
  };
}
