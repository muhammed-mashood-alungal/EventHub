import { Navigate } from "react-router-dom";

type PublicRouteProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isLoading?: boolean;
};

export const PublicRoute = ({
  children,
  isAuthenticated,
  isLoading,
}: PublicRouteProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
