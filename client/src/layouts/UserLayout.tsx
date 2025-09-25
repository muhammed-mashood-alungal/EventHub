import { useEffect, useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { OrganizerSidebar } from "../components/organizer/OrganizerSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { UserSidebar } from "../components/user/UserSidebar";

const UserLayout = () => {
  const [activeSection, setActiveSection] = useState<"tickets" | "events">(
    "events"
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("events")) {
      setActiveSection("events");
    }else if(location.pathname.includes('tickets')){
      setActiveSection('tickets')
    }
  }, [location]);

  const sidebarWidth = useBreakpointValue({ base: 0, md: 280 });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSectionChange = (section: "events" | "tickets") => {
    navigate(`/${section}`);
  };

  return (
    <Box position="relative" minH="100vh">
      {/* Sidebar */}
      <UserSidebar
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

export default UserLayout;
