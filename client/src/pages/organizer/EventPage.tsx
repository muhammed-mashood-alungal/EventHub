import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardRoot,
  Container,
  Heading,
  HStack,
  Separator,
  VStack,
} from "@chakra-ui/react";

import { Edit, X } from "lucide-react";

import type { Event } from "../../types/events.types";
import EventDetails from "../../components/events/EventDetails";
import ManageEvent from "../../components/events/EventManagement";
import ReusableTable from "../../components/ui/table";
import CustomButton from "../../components/ui/button";
import type { TableColumn } from "../../types/common.types";

interface EventManagementProps {
  event: Event;
  currentUserId: string;
}

const EventPage: React.FC<EventManagementProps> = ({
  event,
  currentUserId,
}) => {
  useEffect(() => {
    console.log("Event page loaded");
  }, []);
  const [eventData, setEventData] = useState<Event>(event);
  const isOrganizer = eventData.organizerId === currentUserId;

  // Event handlers
  const handleRegister = () => console.log("Register for event");
  const handleEdit = () => console.log("Edit event");
  const handleCancel = () => console.log("Cancel event");
  const handleMarkAttendance = () => console.log("Mark attendance");
  const handleServeBreakfast = () => console.log("Serve breakfast");
  const handleServeLunch = () => console.log("Serve lunch");
  const handleServeDinner = () => console.log("Serve dinner");

  // Table columns for participant list
  const participantColumns: TableColumn[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    {
      header: "Attended",
      accessor: "attended",
      render: (value: boolean) => (
        <Badge colorScheme={value ? "green" : "red"}>
          {value ? "✅" : "❌"}
        </Badge>
      ),
    },
    ...(eventData.meals.breakfast
      ? [
          {
            header: "Breakfast",
            accessor: "meals",
            render: (meals: any) => (
              <Badge colorScheme={meals?.breakfast ? "green" : "red"}>
                {meals?.breakfast ? "✅" : "❌"}
              </Badge>
            ),
          },
        ]
      : []),
    ...(eventData.meals.lunch
      ? [
          {
            header: "Lunch",
            accessor: "meals",
            render: (meals: any) => (
              <Badge colorScheme={meals?.lunch ? "green" : "red"}>
                {meals?.lunch ? "✅" : "❌"}
              </Badge>
            ),
          },
        ]
      : []),
    ...(eventData.meals.dinner
      ? [
          {
            header: "Dinner",
            accessor: "meals",
            render: (meals: any) => (
              <Badge colorScheme={meals?.dinner ? "green" : "red"}>
                {meals?.dinner ? "✅" : "❌"}
              </Badge>
            ),
          },
        ]
      : []),
  ];

  return (
    <Box minH="100vh" py={8} bg={"gray.100"}>
      <Container maxW="7xl" px={{ base: 4, lg: 8 }}>
        <VStack gap={8} align="stretch">
          {/* Event Details */}
          <EventDetails
            event={eventData}
            currentUserId={currentUserId}
            onRegister={handleRegister}
            onEdit={handleEdit}
            onCancel={handleCancel}
          />
          {/* Manage Event - Only for organizers */}
          {isOrganizer && (
            <ManageEvent
              event={eventData}
              onMarkAttendance={handleMarkAttendance}
              onServeBreakfast={handleServeBreakfast}
              onServeLunch={handleServeLunch}
              onServeDinner={handleServeDinner}
            />
          )}

          {isOrganizer && (
            <VStack align="stretch" gap={4}>
              <CardRoot bg={"gray.200"} color={"gray.900"} border={0}>
                <CardBody>
                  <Heading size="md" mb={4} color="gray.700">
                    Participant List
                  </Heading>
                  <ReusableTable
                    data={eventData.guests}
                    columns={participantColumns}
                  />
                </CardBody>
              </CardRoot>

              {/* Action Buttons */}
              {/* <Card.Root>
                <Card.Body>
                  <VStack gap={4}>
                    <Heading size="md" color="gray.700">
                      Actions
                    </Heading>
                    <HStack justify="center" wrap="wrap" gap={4}>
                      <CustomButton
                        colorScheme="purple"
                        onClick={handleViewReports}
                      >
                        View Reports
                      </CustomButton>
                      <CustomButton
                        colorScheme="teal"
                        onClick={handleExportCSV}
                      >
                        Export CSV
                      </CustomButton>
                      <CustomButton
                        colorScheme="blue"
                        leftIcon={<Edit />}
                        onClick={handleEditEvent}
                      >
                        Edit Event
                      </CustomButton>
                      <CustomButton
                        colorScheme="red"
                        variant="outline"
                        leftIcon={<X />}
                        onClick={handleCloseRegistration}
                      >
                        Close Registration
                      </CustomButton>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root> */}
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default EventPage;
