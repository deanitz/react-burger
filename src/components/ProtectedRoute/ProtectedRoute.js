import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const { pathname } = useLocation();

  return (
    user.isAuthenticated ? (
      children
    ) : (
      <Navigate
        to="/login" state={{returnPath: pathname}} replace={false}
      />
    )
  );
}
