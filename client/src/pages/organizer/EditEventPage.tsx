import { Box, Button, Container } from "@chakra-ui/react";
import { EventForm } from "../../components/events/EventForm";
import { useLocation, useNavigate } from "react-router-dom";
import type { EventFormData } from "../../types/events.types";
import { EventService } from "../../services/event.service";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { useToastNotifier } from "../../contexts/toast.context";

function EditEventPage() {
  const location = useLocation();
  const eventDetails = location.state.event;
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const { notifySuccess } = useToastNotifier();

  const handleEventSubmit = async (event: EventFormData) => {
    try {
      const updatedEvent = await EventService.updateEvent(
        eventDetails?.id,
        event
      );
      navigate(`/org/events/${updatedEvent.slug}`, { replace: true });
      notifySuccess("Event Updated successfully");
    } catch (error) {
      handleError(error, "Update Event Error");
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
          isEditing={true}
          initialData={eventDetails}
          onCancel={() => navigate("/org/events")}
          onSubmit={handleEventSubmit}
        />
      </Container>
    </Box>
  );
}

export default EditEventPage;
