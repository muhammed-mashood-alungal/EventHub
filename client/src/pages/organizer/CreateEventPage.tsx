import { Box, Button, Container } from "@chakra-ui/react";
import { EventForm } from "../../components/events/EventForm";
import { useNavigate } from "react-router-dom";
import type { EventFormData } from "../../types/events.types";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { EventService } from "../../services/event.service";
import { useToastNotifier } from "../../contexts/toast.context";

function CreateEvent() {
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const { notifySuccess } = useToastNotifier();

  const handleEventSubmit = async (data: EventFormData) => {
    try {
      const createdEvent = await EventService.createEvent(data);
      navigate(`/org/events/${createdEvent.slug}`, { replace: true });
      notifySuccess("Event created successfully");
    } catch (error) {
      handleError(error, "Create Event Error");
    }
  };

  return (
    <Box minH="100vh" bg="gray.100" py={8}>
      <Container maxW="7xl" px={{ base: 4, lg: 8 }}>
        <Button
          color={"gray.800"}
          colorScheme={"gray"}
          variant={"outline"}
          _hover={{
            bg: "gray.100",
          }}
          width={20}
          mb={5}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <EventForm
          onCancel={() => navigate("/org/events")}
          onSubmit={handleEventSubmit}
        />
      </Container>
    </Box>
  );
}

export default CreateEvent;
