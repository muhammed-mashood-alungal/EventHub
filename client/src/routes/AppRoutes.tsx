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
import EventPage from "../pages/common/EventPage";
import { sampleEvents } from "../components/events/sample";
import QRScanner from "../components/events/QrScanner";
import { ProtectedRoute } from "./ProtectedRoute";
import EditEventPage from "../pages/organizer/EditEventPage";
import UserLayout from "../layouts/UserLayout";
import AllEventsPage from "../pages/user/AllEventsPage";

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
      <Route
        path="/sample"
        element={<QRScanner onScan={() => console.log("scenner")} />}
      />

     
      <Route path="/" element={<UserLayout />}>
        <Route path="events" element={<AllEventsPage />} />
        <Route
          path="events/:slug"
          element={<EventPage currentUserId={user?.id as string} />}
        />
      </Route>

      <Route path="/org" element={<OrganizerLayout />}>
        <Route path="dashboard" element={<OrganizerDashboard />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/:slug/edit" element={<EditEventPage />} />
        <Route
          path="events/:slug"
          element={<EventPage currentUserId={user?.id as string} />}
        />
      </Route>

      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
