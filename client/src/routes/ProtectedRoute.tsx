import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  role?: "user" | "organizer";
  allowedRoles?: string[];
  isLoading?: boolean;
};

export const ProtectedRoute = ({
  children,
  isAuthenticated,
  isLoading,
  allowedRoles = ['user'],
  role = 'user',
}: ProtectedRouteProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
