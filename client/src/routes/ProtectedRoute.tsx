import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ("user" | "organizer")[];
};

export const ProtectedRoute = ({ children, allowedRoles = ["user"] }: ProtectedRouteProps) => {
  const { user, isAuthenticated, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
