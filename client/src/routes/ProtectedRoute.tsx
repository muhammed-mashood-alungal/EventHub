import { Navigate, useLocation } from "react-router-dom";

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
  allowedRoles = ["user"],
  role = "user",
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !isAuthenticated) {
    console.log(isAuthenticated);
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
