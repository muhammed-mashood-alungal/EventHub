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

  if (loading) return <div>Loading...</div>;

  const isOrganizer = eventData?.organizer.id === currentUserId;

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
      console.log(qrData)
      const { message } = await TicketService.validateTicket(
        qrData,
        currentQrAction
      );
      notifySuccess(message);
    } catch (error) {
      handleError(error);
    }
  };

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
                    data={eventData?.guests}
                    columns={participantColumns}
                  />
                </CardBody>
              </CardRoot>
            </VStack>
          )}

          <BaseModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} >
            <LiveQrScanner
              onScan={handleQrScan}
            />
          </BaseModal>
        </VStack>
      </Container>
    </Box>
  );
};

export default EventPage;
