import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FC, ReactNode } from "react";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  return user.isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ returnPath: pathname }} replace={true} />
  );
};

export default ProtectedRoute;
