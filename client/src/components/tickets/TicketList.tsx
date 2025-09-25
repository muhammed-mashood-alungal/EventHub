import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  VStack,
  Button,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { CardRoot, CardBody } from "@chakra-ui/react";
import type { ITicket } from "../../types/ticket.types";
import type { TableColumn } from "../../types/common.types";
import ReusableTable from "../ui/table";
import TicketDisplay from "./TicketDisplay";
import { useAuth } from "../../contexts/auth.context";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { TicketService } from "../../services/ticket.service";

const TicketList: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const { user } = useAuth();
  const handleError = useErrorHandler();

  const fetchMyTickets = async () => {
    try {
      if (!user) return;
      const { data } = await TicketService.getMyEventTickets();
      setTickets(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchMyTickets();
  }, []);

  const handleShowTicket = (ticket: ITicket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleCloseTicket = () => {
    setSelectedTicket(null);
    setShowTicketModal(false);
  };
  const getEventStatus = (startTime: Date, endTime: Date) => {
    const currentTime = new Date();

    if (startTime > currentTime) {
      return "upcoming";
    } else if (endTime < currentTime) {
      return "completed";
    } else {
      return "ongoing";
    }
  };
  const ticketColumns: TableColumn[] = [
    {
      header: "Event Title",
      accessor: "event",
      render: (event: any) => event?.title || "N/A",
    },
    {
      header: "Event Date",
      accessor: "event",
      render: (event: any) => {
        if (!event?.startTime) return "N/A";
        return new Date(event.startTime).toLocaleDateString();
      },
    },
    {
      header: "Status",
      accessor: "event",
      render: (event: any) => {
        const status = getEventStatus(
          new Date(event.startTime),
          new Date(event.endTime)
        );
        return <Badge>{status}</Badge>;
      },
    },
    {
      header: "Attendance",
      accessor: "attendanceMarked",
      render: (attended: boolean) => (
        <Badge colorScheme={attended ? "green" : "red"}>
          {attended ? "✅ Attended" : "❌ Not Attended"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (id: string, ticket: ITicket) => {
        const status = getEventStatus(
          new Date(ticket.event.startTime),
          new Date(ticket.event.endTime)
        );
        return (
          <Button
            size="sm"
            color={"gray.800"}
            variant="outline"
            onClick={() => handleShowTicket(ticket)}
            disabled={status === "completed"}
          >
            Show Ticket
          </Button>
        );
      },
    },
  ];

  return (
    <Box minH="100vh" py={8} bg={"gray.100"}>
      <Container maxW="7xl" px={{ base: 4, lg: 8 }}>
        <VStack gap={8} align="stretch">
          <VStack align="stretch" gap={4}>
            <CardRoot bg={"gray.200"} color={"gray.900"} border={0}>
              <CardBody>
                <Heading size="md" mb={4} color="gray.700">
                  My Tickets
                </Heading>
                <ReusableTable data={tickets} columns={ticketColumns} />
              </CardBody>
            </CardRoot>
          </VStack>

          {showTicketModal && selectedTicket && (
            <TicketDisplay
              ticket={selectedTicket}
              onClose={handleCloseTicket}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default TicketList;
