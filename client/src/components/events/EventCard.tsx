import {
  Text,
  Badge,
  VStack,
  HStack,
  CardBody,
  Heading,
  TagLabel,
  Wrap,
  WrapItem,
  Icon,
  Flex,
  CardRoot,
  TagRoot
} from "@chakra-ui/react";
import { Calendar, MapPin, Clock, Utensils } from "lucide-react";
import type { Event } from "../../types/events.types";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
    <CardRoot
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      _hover={{
        borderColor: "gray.300",
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      transition="all 0.2s"
      cursor="pointer"
      onClick={()=>{

      }}
    >
      <CardBody>
        <VStack align="stretch" gap={4}>
          {/* Header */}
          <Flex justify="space-between" align="flex-start">
            <VStack align="flex-start" gap={1} flex={1}>
              <Heading size="md" color="black">
                {event.title}
              </Heading>
              <HStack>
                <Badge colorScheme={getCategoryColor(event.category)} variant="subtle">
                  {event.category}
                </Badge>
              </HStack>
            </VStack>
          </Flex>

          {/* Description */}
          <Text color="gray.600" fontSize="sm" >
            {event.description}
          </Text>

         <hr />
          {/* Event Details */}
          <VStack align="stretch" gap={2}>
            <HStack color="gray.700">
              <Icon as={Calendar}  />
              <Text fontSize="sm">
                {formatDate(event.startTime)} - {formatDate(event.endTime)}
              </Text>
            </HStack>
            
            <HStack color="gray.700">
              <Icon as={Clock} />
              <Text fontSize="sm">
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </Text>
            </HStack>
            
            <HStack color="gray.700" align="flex-start">
              <Icon as={MapPin}  mt={0.5} />
              <Text fontSize="sm" >
                {event.venue}
              </Text>
            </HStack>
          </VStack>

          {/* Food Info */}
          {event.foodIncluded && (
            <>
           
              <VStack align="stretch" gap={2}>
                <HStack color="gray.700">
                  <Icon as={Utensils}  />
                  <Text fontSize="sm" fontWeight="medium">
                    Food Included
                  </Text>
                </HStack>
                <Wrap>
                   {Object.entries(event.meals).filter(([meal , has])=>has).map((food, index) => (
                    <WrapItem key={index}>
                      <TagRoot size="sm" colorScheme="green" variant="subtle">
                        <TagLabel>{food}</TagLabel>
                      </TagRoot>
                    </WrapItem>
                  ))}
                </Wrap>
              </VStack>
            </>
          )}
        </VStack>
      </CardBody>
    </CardRoot>
  );
}