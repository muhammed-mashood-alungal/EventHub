import { useEffect, useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { OrganizerSidebar } from "../organizer/OrganizerSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const OrganizerLayout = () => {
  const [activeSection, setActiveSection] = useState<"events">("events");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("events")) {
      setActiveSection("events");
    }
  }, [location]);

  const sidebarWidth = useBreakpointValue({ base: 0, md: 280 });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSectionChange = (section: "events") => {
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
