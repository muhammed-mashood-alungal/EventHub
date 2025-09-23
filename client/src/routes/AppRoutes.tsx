import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { useAuth } from "../contexts/auth.context";
import LoginPage from "../pages/auth/SignInPage";
import SignupPage from "../pages/auth/SignupPage";

export default function AppRoutes() {
  const { isAuthenticated, authLoading } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute
            isAuthenticated={isAuthenticated}
            isLoading={authLoading}
          >
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute
            isAuthenticated={isAuthenticated}
            isLoading={authLoading}
          >
            <SignupPage  role="user" />
          </PublicRoute>
        }
      />
      <Route
        path="/org/signup"
        element={
          <PublicRoute
            isAuthenticated={isAuthenticated}
            isLoading={authLoading}
          >
            <SignupPage role="organizer" />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            isLoading={authLoading}
          >
            <div>dfsdf</div>
          </ProtectedRoute>
        }
      />

      {/* Optional: catch-all 404 page */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
