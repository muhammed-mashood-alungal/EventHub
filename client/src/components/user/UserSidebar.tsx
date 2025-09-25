import {
  Box,
  VStack,
  Text,
  Icon,
  Button,
  Separator,
  useBreakpointValue,
  Drawer,
  IconButton,
  useDisclosure,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { FiHome, FiUser, FiShield } from "react-icons/fi";

interface SidebarProps {
  activeSection: "tickets" | "events";
  onSectionChange: (section: "tickets" | "events") => void;
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

const SidebarContent = ({
  activeSection,
  onSectionChange,
}: SidebarProps) => (
  <VStack gap={4} align="stretch" h="full">
    <Box p={6} borderBottom="1px" borderColor="gray.200">
      <Text fontSize="xl" fontWeight="bold" color="black">
       User Dashboard
      </Text>
    </Box>

    <VStack gap={2} px={4} flex={1}>
      <Button
        w="full"
        justifyContent="flex-start"
        variant={activeSection === "events" ? "solid" : "ghost"}
        bg={activeSection === "events" ? "gray.600" : "transparent"}
        color={activeSection === "events" ? "white" : "gray.600"}
        _hover={{
          bg: activeSection === "events" ? "gray.700" : "gray.100",
          color: activeSection === "events" ? "white" : "gray.700",
        }}
        onClick={() => onSectionChange("events")}
        size="lg"
        fontSize="md"
        gap={2}
      >
        <Icon as={FiUser} />
        All Events
      </Button>
      <Button
        w="full"
        justifyContent="flex-start"
        variant={activeSection === "tickets" ? "solid" : "ghost"}
        bg={activeSection === "tickets" ? "gray.600" : "transparent"}
        color={activeSection === "tickets" ? "white" : "gray.600"}
        _hover={{
          bg: activeSection === "tickets" ? "gray.700" : "gray.100",
          color: activeSection === "tickets" ? "white" : "gray.700",
        }}
        onClick={() => onSectionChange("tickets")}
        size="lg"
        fontSize="md"
        gap={2}
      >
        <Icon as={FiHome} />
        My Tickets
      </Button>
    </VStack>
  </VStack>
);

export const UserSidebar = (props: SidebarProps) => {
  const { open, onOpen, onClose, setOpen } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <>
        <IconButton
          aria-label="Open menu"
          onClick={onOpen}
          position="fixed"
          top={4}
          left={4}
          zIndex={20}
          bg="white"
          shadow="md"
          color="gray.600"
          _hover={{ bg: "gray.100" }}
        >
          <FaBars />
        </IconButton>

        <Drawer.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          placement="start"
          size="sm"
        >
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content bg="white">
                <Box p={2} display="flex" justifyContent="flex-end">
                  <CloseButton onClick={onClose} color="gray.600" />
                </Box>
                <Drawer.Body p={0}>
                  <SidebarContent {...props} />
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </>
    );
  }

  return (
    <Box
      w="280px"
      h="100vh"
      bg="white"
      shadow="md"
      position="fixed"
      left={0}
      top={0}
      zIndex={10}
    >
      <SidebarContent {...props} />
    </Box>
  );
};
