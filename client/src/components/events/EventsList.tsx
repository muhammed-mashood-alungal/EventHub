import {
  Box,
  Container,
  VStack,
  HStack,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Input,
  useBreakpointValue,
  createListCollection,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { Event } from "../../types/events.types";
import { EventCard } from "./EventCard";
import { Pagination } from "../common/Pagination";
import type { IPagination } from "../../types/common.types";
import { categoriesNames } from "../data/categories";
import CustomSelect from "../ui/drop-down";
import { useNavigate } from "react-router-dom";

interface EventsListProps {
  events: Event[];
  pagination: IPagination | null;
  loading: boolean;
  fetchEvents: (query: string) => void;
  isOrganizer: boolean;
}

type EventStatus = "upcoming" | "completed" | "ongoing";

export function EventsList({
  events,
  pagination,
  loading,
  fetchEvents,
  isOrganizer,
}: EventsListProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("All");
  const [eventStatus, setEventStatus] = useState<EventStatus>("upcoming");
  const limit = 10;
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const categories = createListCollection({
    items: [
      { label: "All Categories", value: "" },
      ...categoriesNames.map((name) => ({ label: name, value: name })),
    ],
  });

  const handleStatusChange = (status: EventStatus) => {
    setEventStatus(status);
    setPage(1);
  };

  const navigate = useNavigate();


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        fetchEvents(
          `search=${search}&category=${category}&status=${eventStatus}&page=${page}&limit=${limit}`
        );
      },
      search ? 300 : 0
    );

    return () => clearTimeout(timeoutId);
  }, [search, category, eventStatus, page]);

  const getStatusConfig = (status: EventStatus) => {
    return {
      upcoming: {
        title: "Upcoming Events",
        description: "Discover exciting upcoming events and opportunities",
        badgeColor: "green",
      },
      completed: {
        title: "Completed Events",
        description: "Browse through past events and their highlights",
        badgeColor: "gray",
      },
      ongoing: {
        title: "Ongoing Events",
        description: "Stay updated on ongoing events and their progress",
        badgeColor: "blue",
      },
    }[status];
  };

  const statusConfig = getStatusConfig(eventStatus);

  return (
    <Box minH="100vh" bg="gray.50" py={3}>
      <Container maxW="7xl" px={{ base: 4, lg: 8 }}>
        <VStack gap={8} align="stretch">
          {/* Header Section */}
          <VStack gap={6} align="stretch">
            <Flex
              align="flex-start"
              justify="space-between"
              direction={{ base: "column", lg: "row" }}
              gap={6}
            >
              <VStack align="flex-start" gap={2}>
                <HStack gap={3} align="center">
                  <Heading size="xl" color="gray.800">
                    {statusConfig.title}
                  </Heading>
                </HStack>
                <Text color="gray.600" fontSize="md">
                  {statusConfig.description}
                </Text>
              </VStack>

              {/* Event Status Toggler */}
              <ButtonGroup size="md" variant="outline">
                <Button
                  color={"gray.800"}
                  colorScheme={eventStatus === "upcoming" ? "blue" : "gray"}
                  variant={eventStatus === "upcoming" ? "solid" : "outline"}
                  onClick={() => handleStatusChange("upcoming")}
                  _hover={{
                    bg: "gray.100",
                  }}
                >
                  Upcoming
                </Button>
                <Button
                  color={"gray.800"}
                  colorScheme={eventStatus === "ongoing" ? "blue" : "gray"}
                  variant={eventStatus === "ongoing" ? "solid" : "outline"}
                  onClick={() => handleStatusChange("ongoing")}
                  _hover={{
                    bg: "gray.100",
                  }}
                >
                  Ongoing
                </Button>
                <Button
                  color={"gray.800"}
                  colorScheme={eventStatus === "completed" ? "blue" : "gray"}
                  variant={eventStatus === "completed" ? "solid" : "outline"}
                  onClick={() => handleStatusChange("completed")}
                  _hover={{
                    bg: "gray.100",
                  }}
                >
                  Completed
                </Button>
              </ButtonGroup>
            </Flex>

            {/* Filters Section */}
            <Flex
              align="center"
              justify="space-between"
              direction={{ base: "column", md: "row" }}
              gap={4}
              p={4}
              bg="white"
              borderRadius="lg"
              shadow="sm"
              border="1px"
              borderColor="gray.200"
            >
              <HStack gap={4} w={{ base: "full", md: "auto" }} flex={1}>
                <Input
                  type="text"
                  color="gray.800"
                  placeholder="Search events..."
                  value={search}
                  onChange={handleSearchChange}
                  bg="gray.50"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182ce",
                    bg: "white",
                  }}
                  maxW={{ base: "full", md: "300px" }}
                />
                <CustomSelect
                  options={categories.items}
                  value={category}
                  onChange={(value: any) => {
                    setCategory(value);
                    setPage(1);
                    fetchEvents(
                      `?search=${search}&category=${value}&status=${eventStatus}&page=1`
                    );
                  }}
                  placeholder="Select category"
                />
              </HStack>

              {/* Results count */}
              <Text
                fontSize="sm"
                color="gray.600"
                whiteSpace="nowrap"
                fontWeight="medium"
              >
                {events?.length} {events?.length === 1 ? "event" : "events"}{" "}
                found
              </Text>
            </Flex>
          </VStack>

          {/* Events Grid */}
          <Box>
            {events?.length === 0 && !loading ? (
              <Flex
                minH="300px"
                align="center"
                justify="center"
                direction="column"
                gap={3}
                bg="white"
                borderRadius="lg"
                border="2px dashed"
                borderColor="gray.300"
              >
                <Text fontSize="lg" color="gray.500" fontWeight="medium">
                  No {eventStatus} events found
                </Text>
                <Text fontSize="sm" color="gray.400" textAlign="center">
                  {search || category
                    ? "Try adjusting your search filters"
                    : `No ${eventStatus} events available at the moment`}
                </Text>
              </Flex>
            ) : (
              <SimpleGrid columns={columns} gap={6}>
                {events?.map((event) => (
                  <span
                    onClick={() => {
                      navigate(
                        isOrganizer
                          ? `/org/events/${event.slug}`
                          : `/${event.slug}`
                      );
                    }}
                  >
                    <EventCard key={event.id} event={event} />
                  </span>
                ))}
              </SimpleGrid>
            )}
          </Box>

          {/* Pagination */}
          {events?.length > 0 && pagination && (
            <Flex justify="center">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={(page) => setPage(page)}
              />
            </Flex>
          )}


        </VStack>
      </Container>
    </Box>
  );
}
