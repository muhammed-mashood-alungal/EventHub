import { Button, Flex, Heading } from "@chakra-ui/react";
import { EventsList } from "../../components/events/EventsList";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { EventService } from "../../services/event.service";
import type { IPagination } from "../../types/common.types";

function MyEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [pagination, setPagination] = useState<IPagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleError = useErrorHandler();

  const fetchEvents = async (query: string) => {
    try {
      setIsLoading(true);
      const { data, pagination } = await EventService.getMyEvents(query);
      console.log("Pagination:", pagination);
      console.log("Events:", data);
      setEvents(data);
      setPagination(pagination);
    } catch (error) {
      handleError(error, "Fetching Events Error");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Flex bg={"gray.50"} justify={"space-between"} p={5}>
        <Heading as="h2" mb={6} bg={"white"} color={"black"}>
          My Events
        </Heading>
        <Button
          colorScheme="blue"
          _hover={{ bg: "blue.600" }}
          onClick={() => {
            navigate("/org/events/create");
          }}
          whiteSpace="nowrap"
        >
          Create Event
        </Button>
      </Flex>
      
        <EventsList
         isOrganizer={true} 
          loading={isLoading}
          events={events}
          pagination={pagination}
          fetchEvents={fetchEvents}
        />
      
    </>
  );
}

export default MyEvents;
