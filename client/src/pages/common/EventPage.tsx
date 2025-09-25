import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  CardBody,
  CardRoot,
  Container,
  Heading,
  VStack,
} from "@chakra-ui/react";

import type { Event } from "../../types/events.types";
import EventDetails from "../../components/events/EventDetails";
import ManageEvent from "../../components/events/EventManagement";
import ReusableTable from "../../components/ui/table";
import type { TableColumn } from "../../types/common.types";
import { EventService } from "../../services/event.service";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { useToastNotifier } from "../../contexts/toast.context";
import LiveQrScanner from "../../components/events/QrScanner";
import { TicketService } from "../../services/ticket.service";
import BaseModal from "../../components/ui/model";
import type { IEventStats, ITicket } from "../../types/ticket.types";

interface EventManagementProps {
  currentUserId: string;
}

const EventPage: React.FC<EventManagementProps> = ({ currentUserId }) => {
  const [eventData, setEventData] = useState<Event>();
  const { user, authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const handleError = useErrorHandler();
  const slug = useParams().slug;
  const navigate = useNavigate();
  const location = useLocation();
  const { notifySuccess } = useToastNotifier();
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [currentQrAction, setCurrentQrAction] = useState("");
  const [stats, setStats] = useState<IEventStats>({
    participated: 0,
    totalRegistrations: 0,
    food: {
      breakfast: 0,
      dinner: 0,
      lunch: 0,
    },
  });
  const isOrganizer = eventData?.organizer.id === currentUserId;

  const [participants, setParticipants] = useState<ITicket[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (!slug) return;
    if (!user) return;
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const event = await EventService.getEventBySlug(slug);
        setEventData(event);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug, user]);

  const fetchRegistraionStats = async () => {
    try {
      if (!eventData) return;
      const data = await TicketService.getRegistraionStats(eventData.id);
      setStats(data);
    } catch (error) {
      handleError(error);
    }
  };

  const fetchParticipants = async () => {
    try {
      if (!eventData) return;
      const { data, pagination } = await TicketService.getEventTickets(
        eventData.id
      );
      setParticipants(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (isOrganizer) {
      fetchRegistraionStats();
      fetchParticipants();
    }
  }, [eventData]);

  if (loading) return <div>Loading...</div>;

  const handleRegister = async () => {
    try {
      await EventService.registerEvent(eventData?.id!, { userId: user?.id! });
      notifySuccess("Registration successful!");
      setEventData((prev) => (prev ? { ...prev, registered: true } : prev));
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => console.log("Cancel event");

  const handleQrScan = async (qrData: string) => {
    try {
      const { message } = await TicketService.validateTicket(
        qrData,
        currentQrAction
      );
      notifySuccess(message);
      handleStatsChange();
    } catch (error) {
      handleError(error);
    }
  };

  const handleStatsChange = () => {
    setStats((stats: IEventStats) => {
      if (currentQrAction == "attendance") {
        return {
          ...stats,
          participated: stats.participated + 1,
        };
      } else if (currentQrAction == "food-breakfast") {
        return {
          ...stats,
          food: { ...stats.food, breakfast: stats.food.breakfast + 1 },
        };
      } else if (currentQrAction == "food-lunch") {
        return {
          ...stats,
          food: { ...stats.food, lunch: stats.food.lunch + 1 },
        };
      } else {
        return {
          ...stats,
          food: { ...stats.food, dinner: stats.food.dinner + 1 },
        };
      }
    });
  };

  const participantColumns: TableColumn[] = [
    {
      header: "Name",
      accessor: "attendee",
      render: (attendee: any) => attendee?.name,
    },
    {
      header: "Email",
      accessor: "attendee",
      render: (attendee: any) => attendee?.email,
    },
    {
      header: "Phone",
      accessor: "attendee",
      render: (attendee: any) => attendee?.phone,
    },
    {
      header: "Attended",
      accessor: "attendanceMarked",
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
            accessor: "foodServed",
            render: (food: any) => (
              <Badge colorScheme={food?.breakfast?.served ? "green" : "red"}>
                {food?.breakfast?.served ? "✅" : "❌"}
              </Badge>
            ),
          },
        ]
      : []),
    ...(eventData?.meals.lunch
      ? [
          {
            header: "Lunch",
            accessor: "foodServed",
            render: (food: any) => (
              <Badge colorScheme={food?.lunch?.served ? "green" : "red"}>
                {food?.lunch?.served ? "✅" : "❌"}
              </Badge>
            ),
          },
        ]
      : []),
    ...(eventData?.meals.dinner
      ? [
          {
            header: "Dinner",
            accessor: "foodServed",
            render: (food: any) => (
              <Badge colorScheme={food?.dinner?.served ? "green" : "red"}>
                {food?.dinner?.served ? "✅" : "❌"}
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
          <Button
            color={"gray.800"}
            colorScheme={"gray"}
            variant={"outline"}
            _hover={{
              bg: "gray.100",
            }}
            width={20}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <EventDetails
            event={eventData!}
            isOrganizer={isOrganizer}
            onRegister={handleRegister}
            onCancel={handleCancel}
          />

          {isOrganizer && (
            <ManageEvent
              stats={stats!}
              event={eventData!}
              onScanClick={(action) => {
                setCurrentQrAction(action);
                setIsQrOpen(true);
              }}
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
                    data={participants}
                    columns={participantColumns}
                  />
                </CardBody>
              </CardRoot>
            </VStack>
          )}

          <BaseModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)}>
            <LiveQrScanner onScan={handleQrScan} />
          </BaseModal>
        </VStack>
      </Container>
    </Box>
  );
};

export default EventPage;
