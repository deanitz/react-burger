import { Navigate, useLocation } from "react-router-dom";
import { ROUTE_ROOT } from "../utils/routes";
import { useAuth } from "./useAuth";

export function useLoginProtection() {
  const { user } = useAuth();
  const location = useLocation();

  const navigateIfLoggedIn = () =>
    user.isAuthenticated && (
      <Navigate to={location.state?.returnPath || ROUTE_ROOT} replace={false} />
    );

  return {
    navigateIfLoggedIn,
  };
}
