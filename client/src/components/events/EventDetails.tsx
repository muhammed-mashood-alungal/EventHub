import React, { useState } from "react";
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
  Link,
  Box,
} from "@chakra-ui/react";
import { Calendar, Clock, Info, Edit, Building2, ExternalLink } from "lucide-react";
import type { Event } from "../../types/events.types";
import CustomButton from "../ui/button";
import { useNavigate } from "react-router-dom";

interface EventDetailsProps {
  event: Event;
  isOrganizer: boolean;
  onRegister?: () => void;
  onCancel?: () => void;
  loading? : boolean
}

const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  isOrganizer,
  onRegister,
  loading 

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

  const getEventStatus = () => {
    const now = new Date();
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);
    
    if (endTime < now) {
      return "past";
    } else if (startTime <= now && endTime >= now) {
      return "ongoing";
    } else {
      return "upcoming";
    }
  };

  const canEdit = () => {
    const status = getEventStatus();
    return isOrganizer && status !== "past";
  };

  return (
    <Card.Root bg={"gray.200"} color={"gray.900"} border={0}>
      <Card.Body>
        <VStack align="stretch" gap={6}>
          {/* Header Section */}
          <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
            <VStack align="flex-start" gap={2} flex={1} minW="250px">
              <Heading size="xl" color="gray.800" lineHeight="shorter">
                {event?.title}
              </Heading>
              <HStack gap={2} wrap="wrap">
                <Badge colorScheme={getCategoryColor(event.category)} size="sm">
                  {event?.category}
                </Badge>
                {getEventStatus() === "ongoing" && (
                  <Badge colorScheme="green" size="sm">
                    Live
                  </Badge>
                )}
                {getEventStatus() === "past" && (
                  <Badge colorScheme="gray" size="sm">
                    Completed
                  </Badge>
                )}
              </HStack>
            </VStack>
            
            <VStack align="flex-end" gap={2} minW="140px">
              <Text fontSize="sm" color="gray.600" textAlign="right">
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

          {event.organizer?.organization && (
            <Box>
              <VStack align="flex-start" gap={3} p={4} bg="gray.100" borderRadius="md">
                <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                  Organized by:
                </Text>
                <VStack align="flex-start" gap={2} pl={2}>
                  <HStack gap={2}>
                    <Icon as={Building2} color="gray.600" size="sm" />
                    <Text fontSize="md" fontWeight="medium" color="gray.800">
                      {event.organizer.organization.name}
                    </Text>
                  </HStack>
                  
                  {event.organizer.organization.address && (
                    <Text fontSize="sm" color="gray.600" pl={6}>
                      {event.organizer.organization.address}
                    </Text>
                  )}
                  
                  {event.organizer.organization.website && (
                    <HStack gap={2} pl={6}>
                      <Icon as={ExternalLink} color="gray.500" size="xs" />
                      <Link
                        href={event.organizer.organization.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        fontSize="sm"
                        color="blue.600"
                        textDecoration="underline"
                        _hover={{ color: "blue.800" }}
                      >
                        Visit Website
                      </Link>
                    </HStack>
                  )}
                </VStack>
              </VStack>
            </Box>
          )}

          {/* Guests Section */}
          {event.guests && event.guests.length > 0 && (
            <Box>
              <VStack align="flex-start" gap={3}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                  Featured Guests:
                </Text>
                <SimpleGrid 
                  columns={{ base: 1, md: 2 }} 
                  gap={3} 
                  w="full"
                  pl={2}
                >
                  {event.guests?.map((guest, index) => (
                    <VStack 
                      key={index} 
                      align="flex-start" 
                      gap={1}
                      p={3}
                      bg="gray.100"
                      borderRadius="md"
                    >
                      <Badge bg={"yellow.600"} size="md">
                        {guest.name}
                      </Badge>
                      <Text fontSize="sm" color="gray.600">
                        {guest.role}
                      </Text>
                      {isOrganizer && (
                        <Text fontSize="xs" color="gray.500">
                          {guest.email}
                        </Text>
                      )}
                    </VStack>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          )}

          {/* Description Section */}
          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={3} color="gray.700">
              Description:
            </Text>
            <Box
              p={4}
              bg="gray.50"
              borderRadius="md"
              borderLeft="4px solid"
              borderLeftColor="gray.400"
            >
              <Text 
                color="gray.700" 
                lineHeight="relaxed"
                whiteSpace="pre-wrap"
                wordBreak="break-word"
              >
                {event.description}
              </Text>
            </Box>
          </Box>

          {/* Event Details Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
            <VStack align="flex-start" gap={4}>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                Event Information:
              </Text>
              <VStack align="flex-start" gap={3} pl={2}>
                <HStack gap={3}>
                  <Icon as={Info} color="gray.500" />
                  <VStack align="flex-start" gap={0}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      Venue:
                    </Text>
                    <Text fontSize="sm" color="gray.600">{event.venue}</Text>
                  </VStack>
                </HStack>
                <HStack gap={3}>
                  <Icon as={Calendar} color="gray.500" />
                  <VStack align="flex-start" gap={0}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      Start Time:
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {new Date(event.startTime).toLocaleString()}
                    </Text>
                  </VStack>
                </HStack>
                <HStack gap={3}>
                  <Icon as={Clock} color="gray.500" />
                  <VStack align="flex-start" gap={0}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      End Time:
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {new Date(event.endTime).toLocaleString()}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>

            {event.foodIncluded && (
              <VStack align="flex-start" gap={4}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                  Meals Included:
                </Text>
                <Box pl={2}>
                  <Wrap gap={2}>
                    {event.meals.breakfast && (
                      <WrapItem>
                        <Badge colorScheme="orange" size="md">Breakfast</Badge>
                      </WrapItem>
                    )}
                    {event.meals.lunch && (
                      <WrapItem>
                        <Badge colorScheme="yellow" size="md">Lunch</Badge>
                      </WrapItem>
                    )}
                    {event.meals.dinner && (
                      <WrapItem>
                        <Badge colorScheme="red" size="md">Dinner</Badge>
                      </WrapItem>
                    )}
                    {event.meals.drinks && (
                      <WrapItem>
                        <Badge colorScheme="cyan" size="md">Drinks</Badge>
                      </WrapItem>
                    )}
                  </Wrap>
                </Box>
              </VStack>
            )}
          </SimpleGrid>

          <Separator />

          {/* Action Buttons */}
          <Flex justify="center" gap={4} wrap="wrap">
            {canEdit() ? (
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
            ) : (
              !isOrganizer && (
                <CustomButton
                  colorScheme="green"
                  size="lg"
                  onClick={onRegister}
                  isDisabled={event.registeredCount! >= event.capacity || getEventStatus() === "past" || event.registered}
                  loading={loading}
                >
                  {getEventStatus() === "past"
                    ? "Event Completed"
                    : event.registeredCount! >= event.capacity
                    ? "Event Full"
                    : event.registered
                    ? "Already Registered"
                    : "Register"}
                </CustomButton>
              )
            )}
          </Flex>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default EventDetails;