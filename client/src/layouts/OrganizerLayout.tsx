import { useEffect, useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { OrganizerSidebar } from "../components/organizer/OrganizerSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

const OrganizerLayout = () => {
  const [activeSection, setActiveSection] = useState<"dashboard" | "events">(
    "dashboard"
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) {
      return;
    } else if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    } else if (isAuthenticated && user?.role != "organizer") {
      navigate("/");
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    if (location.pathname.includes("events")) {
      setActiveSection("events");
    } else {
      setActiveSection("dashboard");
    }
  }, [location]);

  const sidebarWidth = useBreakpointValue({ base: 0, md: 280 });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSectionChange = (section: "dashboard" | "events") => {
    navigate(`/org/${section}`);
  };

  return (
    <Box position="relative" minH="100vh">
      {/* Sidebar */}
      <OrganizerSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <Box
        ml={isMobile ? 0 : `${sidebarWidth}px`}
        transition="margin-left 0.2s"
        pt={isMobile ? "60px" : 0}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default OrganizerLayout;
