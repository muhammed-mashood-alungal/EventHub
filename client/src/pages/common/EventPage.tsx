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

import type { Event } from "../../types/events.types";
import EventDetails from "../../components/events/EventDetails";
import ManageEvent from "../../components/events/EventManagement";
import ReusableTable from "../../components/ui/table";
import type { TableColumn } from "../../types/common.types";
import { EventService } from "../../services/event.service";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

interface EventManagementProps {
  currentUserId: string;
}

const EventPage: React.FC<EventManagementProps> = ({ currentUserId }) => {
  const [eventData, setEventData] = useState<Event>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const handleError = useErrorHandler();
  const slug = useParams().slug;

  useEffect(() => {
    if (!slug) return;
    if (!user) return;
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const event = await EventService.getEventBySlug(slug);
        setEventData(event);
        console.log(event);
        console.log(user);
        console.log(user?.id, ((event as any)?.organizer as any)?.id);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug, user]);


  if (loading) return <div>Loading...</div>;

  const isOrganizer = eventData?.organizer.id === currentUserId;

  const handleRegister = () => console.log("Register for event");
  const handleEdit = () => console.log("Edit event");
  const handleCancel = () => console.log("Cancel event");
  const handleMarkAttendance = () => console.log("Mark attendance");
  const handleServeBreakfast = () => console.log("Serve breakfast");
  const handleServeLunch = () => console.log("Serve lunch");
  const handleServeDinner = () => console.log("Serve dinner");

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
    ...(eventData?.meals.breakfast
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
    ...(eventData?.meals.lunch
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
    ...(eventData?.meals.dinner
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
            event={eventData!}
            isOrganizer={isOrganizer}
            onRegister={handleRegister}
            onCancel={handleCancel}
          />
          {/* Manage Event - Only for organizers */}
          {isOrganizer && (
            <ManageEvent
              event={eventData!}
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
                    data={eventData?.guests}
                    columns={participantColumns}
                  />
                </CardBody>
              </CardRoot>
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default EventPage;
