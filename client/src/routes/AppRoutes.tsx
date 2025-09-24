import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { useAuth } from "../contexts/auth.context";
import LoginPage from "../pages/auth/SignInPage";
import SignupPage from "../pages/auth/SignupPage";
import OrganizerLayout from "../layouts/OrganizerLayout";
import { useEffect } from "react";
import OrganizerDashboard from "../pages/organizer/HomePage";
import MyEvents from "../pages/organizer/MyEventsPage";
import CreateEvent from "../pages/organizer/CreateEventPage";
import EventPage from "../pages/organizer/EventPage";
import { sampleEvents } from "../components/events/sample";

export default function AppRoutes() {
  const { isAuthenticated, authLoading, user } = useAuth();
  useEffect(() => {
    console.log("Auth Loading:", authLoading);
    console.log("Is Authenticated:", isAuthenticated);
  }, [authLoading, isAuthenticated]);

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
            <SignupPage role="user" />
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

      <Route path="/org" element={<OrganizerLayout />}>
        <Route path="dashboard" element={<OrganizerDashboard />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route
          path="events/123"
          element={<EventPage event={sampleEvents[0]} currentUserId="org1" />}
        />
      </Route>

      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
