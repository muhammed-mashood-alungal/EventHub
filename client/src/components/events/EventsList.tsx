import {
  Box,
  Container,
  VStack,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Input,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import type { Event } from "../../types/events.types";
import { sampleEvents } from "./sample";
import { EventCard } from "./EventCard";

export function EventsList() {
  const [events] = useState<Event[]>(sampleEvents);
  const [search, setSearch] = useState("");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const filteredEvents = events.filter((event : Event) =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.description.toLowerCase().includes(search.toLowerCase()) ||
    event.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box minH="100vh" bg="gray.100" py={8}>
      <Container maxW="7xl" px={{ base: 4, lg: 8 }}>
        <VStack gap={8} align="stretch">
          <Flex align="center" justify="space-between" direction={{ base: "column", md: "row" }} gap={4}>
            <VStack align="flex-start" gap={1}>
              <Heading size="lg" color="black">
                Latest Events
              </Heading>
              <Text color="gray.600">
                Discover exciting events and opportunities
              </Text>
            </VStack>
            
            <Flex align="center" direction={{ base: "column", sm: "row" }} gap={4} w={{ base: "full", md: "auto" }}>
              <Input
                type="text"
                color="black"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px #3182ce",
                }}
                w={{ base: "full", sm: "300px" }}
              />
              <Button
                colorScheme="blue"
                _hover={{ bg: "blue.600" }}
                onClick={() => setIsEventModalOpen(true)}
                whiteSpace="nowrap"
              >
                Create Event
              </Button>
            </Flex>
          </Flex>

          <SimpleGrid columns={columns} gap={6}>
            {filteredEvents.length === 0 && (
              <Text color="gray.600" gridColumn="1 / -1" textAlign="center">
                Oooppsss, No events found......
              </Text>
            )}
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}