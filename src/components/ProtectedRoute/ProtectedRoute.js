import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const { pathname } = useLocation();

  console.log("navigating to ", user.isAuthenticated ? children : "login");
  console.log("returnPath", pathname);
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
