import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { useAuth } from "../contexts/auth.context";
import LoginPage from "../pages/auth/SignInPage";
import SignupPage from "../pages/auth/SignupPage";
import OrganizerLayout from "../components/layouts/OrganizerLayout";
import MyEvents from "../pages/organizer/MyEventsPage";
import CreateEvent from "../pages/organizer/CreateEventPage";
import EventPage from "../pages/common/EventPage";
import EditEventPage from "../pages/organizer/EditEventPage";
import UserLayout from "../components/layouts/UserLayout";
import AllEventsPage from "../pages/user/AllEventsPage";
import MyTicketsPage from "../pages/user/MyTickets";
import { ProtectedRoute } from "./ProtectedRoute";
import Unauthorized from "../pages/common/Unthorized";

export default function AppRoutes() {
  const { isAuthenticated, authLoading, user } = useAuth();

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

      <Route path="/" element={<UserLayout />}>
        <Route path="" index element={<AllEventsPage />} />
        <Route path="tickets" element={<MyTicketsPage />} />
        <Route
          path="/:slug"
          element={<EventPage currentUserId={user?.id as string} />}
        />
      </Route>

      <Route
        path="/org"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <OrganizerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="events" element={<MyEvents />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/:slug/edit" element={<EditEventPage />} />
        <Route
          path="events/:slug"
          element={<EventPage currentUserId={user?.id as string} />}
        />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
