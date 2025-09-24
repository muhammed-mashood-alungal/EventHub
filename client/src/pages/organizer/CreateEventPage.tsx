import { Box, Container } from "@chakra-ui/react";
import { EventForm } from "../../components/events/EventForm";

function CreateEvent() {
  return (
    <Box minH="100vh" bg="gray.100" py={8}>
      <Container maxW="7xl" px={{ base: 4, lg: 8 }}>
        <EventForm
          onCancel={() => console.log()}
          onSubmit={() => console.log()}
        />
      </Container>
    </Box>
  );
}

export default CreateEvent;
