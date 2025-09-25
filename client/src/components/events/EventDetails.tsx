import React from "react";
import {
  Badge,
  Separator,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
  WrapItem,
  Card,
  ProgressRoot,
} from "@chakra-ui/react";
import { Calendar, Clock, Info, Edit, Trash2 } from "lucide-react";
import type { Event } from "../../types/events.types";
import CustomButton from "../ui/button";
import { useNavigate } from "react-router-dom";

interface EventDetailsProps {
  event: Event;
  isOrganizer: boolean;
  onRegister?: () => void;
  onCancel?: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  isOrganizer,
  onRegister,
  onCancel,
}) => {
  const navigate = useNavigate();
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Hackathon: "purple",
      Concert: "pink",
      Conference: "blue",
      Workshop: "green",
      Other: "gray",
    };
    return colors[category] || "gray";
  };

  return (
    <Card.Root bg={"gray.200"} color={"gray.900"} border={0}>
      <Card.Body>
        <VStack align="stretch" gap={4}>
          <Flex justify="space-between" align="flex-start">
            <VStack align="flex-start" gap={2}>
              <Heading size="lg" color="gray.800">
                {event.title}
              </Heading>
              <Badge colorScheme={getCategoryColor(event.category)} size="sm">
                {event.category}
              </Badge>
            </VStack>
            <VStack align="flex-end" gap={1}>
              <Text fontSize="sm" color="gray.600">
                {event?.registeredCount}/{event.capacity} registered
              </Text>
              <ProgressRoot
                value={(event.registeredCount! / event.capacity) * 100}
                size="sm"
                colorScheme="blue"
                w="120px"
              />
            </VStack>
          </Flex>
          {event.guests && event.guests.length > 0 && (
            <VStack align="flex-start" gap={2} mt={3}>
              <Text fontSize="sm" fontWeight="medium" color="gray.700">
                Guests:
              </Text>
              <VStack align="flex-start" gap={1} pl={2}>
                {event.guests?.map((guest, index) => (
                  <HStack key={index} gap={2}>
                    <Badge bg={"yellow.600"} size="md">
                      {guest.name}
                    </Badge>
                    <Text fontSize="md" color="gray.600">
                      {guest.role}
                    </Text>
                    {isOrganizer && (
                      <Text fontSize="sm" color="gray.600">
                        - ( Email Id : {guest.email})
                      </Text>
                    )}
                  </HStack>
                ))}
              </VStack>
            </VStack>
          )}

          <Text color="gray.700">{event.description}</Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <VStack align="flex-start" gap={2}>
              <HStack>
                <Icon as={Info} color="gray.500" />
                <Text fontWeight="medium" color="gray.700">
                  Venue:
                </Text>
                <Text color="gray.600">{event.venue}</Text>
              </HStack>
              <HStack>
                <Icon as={Calendar} color="gray.500" />
                <Text fontWeight="medium" color="gray.700">
                  Start:
                </Text>
                <Text color="gray.600">
                  {new Date(event.startTime).toLocaleString()}
                </Text>
              </HStack>
              <HStack>
                <Icon as={Clock} color="gray.500" />
                <Text fontWeight="medium" color="gray.700">
                  End:
                </Text>
                <Text color="gray.600">
                  {new Date(event.endTime).toLocaleString()}
                </Text>
              </HStack>
            </VStack>

            {event.foodIncluded && (
              <VStack align="flex-start" gap={2}>
                <Text fontWeight="medium" color="gray.700">
                  Meals Included:
                </Text>
                <Wrap>
                  {event.meals.breakfast && (
                    <WrapItem>
                      <Badge colorScheme="orange">Breakfast</Badge>
                    </WrapItem>
                  )}
                  {event.meals.lunch && (
                    <WrapItem>
                      <Badge colorScheme="yellow">Lunch</Badge>
                    </WrapItem>
                  )}
                  {event.meals.dinner && (
                    <WrapItem>
                      <Badge colorScheme="red">Dinner</Badge>
                    </WrapItem>
                  )}
                  {event.meals.drinks && (
                    <WrapItem>
                      <Badge colorScheme="cyan">Drinks</Badge>
                    </WrapItem>
                  )}
                </Wrap>
              </VStack>
            )}
          </SimpleGrid>

          <Separator />

          <Flex justify="center" gap={4}>
            {isOrganizer ? (
              <>
                <CustomButton
                  colorScheme="blue"
                  leftIcon={<Edit />}
                  onClick={() =>
                    navigate(`/org/events/${event.slug}/edit`, {
                      state: { event },
                    })
                  }
                >
                  Edit Event
                </CustomButton>
                <CustomButton
                  colorScheme="red"
                  variant="outline"
                  leftIcon={<Trash2 />}
                  onClick={onCancel}
                >
                  Cancel Event
                </CustomButton>
              </>
            ) : (
              <CustomButton
                colorScheme="green"
                size="lg"
                onClick={onRegister}
                isDisabled={event.registeredCount! >= event.capacity}
              >
                {event.registeredCount! >= event.capacity
                  ? "Event Full"
                  : "Register Now"}
              </CustomButton>
            )}
          </Flex>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default EventDetails;
