import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Image,
  Center,
  Separator,
  Flex,
} from "@chakra-ui/react";
import { CardRoot, CardBody, CardHeader } from "@chakra-ui/react";
import type { ITicket } from "../../types/ticket.types";

interface TicketDisplayProps {
  ticket: ITicket;
  onClose: () => void;
}

const TicketDisplay: React.FC<TicketDisplayProps> = ({ ticket, onClose }) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      p={4}
    >
      <CardRoot
        maxW="md"
        w="full"
        bg="white"
        border={0}
        borderRadius="xl"
        boxShadow="xl"
      >
        <CardHeader>
          <HStack justify="space-between" align="center">
            <Heading size="md" color="gray.700">
              Event Ticket
            </Heading>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              color="gray.500"
              _hover={{ bg: "gray.100" }}
            >
              ✕
            </Button>
          </HStack>
        </CardHeader>

        <CardBody>
          <VStack gap={6} align="center">
            {/* Event Information */}
            <VStack gap={2} align="center">
              <Heading size="lg" textAlign="center" color="gray.800">
                {ticket.event?.title || "Event Title"}
              </Heading>
              <Text color="gray.600" fontSize="md">
                {ticket.event?.startTime
                  ? new Date(ticket.event.startTime).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Date not available"}
              </Text>
              {ticket.event?.venue && (
                <Text color="gray.600" fontSize="sm">
                  Venue :  {ticket.event.venue}
                </Text>
              )}
            </VStack>

            <Separator />

            {/* QR Code */}
            <VStack gap={4} align="center">
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Scan this QR code for entry
              </Text>

              <Center
                p={4}
                bg="gray.50"
                borderRadius="xl"
                border="2px solid"
                borderColor="gray.200"
              >
                {ticket.qrCode ? (
                  <>
                    <Flex direction={'column'}>
                      <Image
                        src={`${ticket.qrCode}`}
                        alt="Ticket QR Code"
                        boxSize="200px"
                        objectFit="contain"
                      />

                      <Button
                        mt={4}
                        size="sm"
                        colorScheme="blue"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = ticket.qrCode as string;
                          link.download = `${
                            ticket.uniqueCode || "ticket"
                          }.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        Download QR
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <Box
                    boxSize="200px"
                    bg="gray.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                  >
                    <Text color="gray.500" fontSize="sm">
                      QR Code not available
                    </Text>
                  </Box>
                )}
              </Center>

              {/* Unique Code */}
              <VStack gap={2} align="center">
                <Text fontSize="sm" color="gray.600">
                  Ticket Code
                </Text>
                <Box
                  px={4}
                  py={2}
                  bg="gray.100"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.300"
                >
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    fontFamily="mono"
                    color="gray.800"
                  >
                    {ticket.uniqueCode || "N/A"}
                  </Text>
                </Box>
              </VStack>
            </VStack>

            <Separator />

            {/* Additional Info */}
            <VStack gap={3} align="stretch" w="full">
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">
                  Ticket ID:
                </Text>
                <Text fontSize="sm" color="gray.800" fontFamily="mono">
                  {ticket.id.slice(-8).toUpperCase()}
                </Text>
              </HStack>

              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">
                  Attendee:
                </Text>
                <Text fontSize="sm" color="gray.800">
                  {ticket.attendee?.name || "N/A"}
                </Text>
              </HStack>

              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">
                  Status:
                </Text>
                <Text
                  fontSize="sm"
                  color={ticket.attendanceMarked ? "green.600" : "orange.600"}
                  fontWeight="medium"
                >
                  {ticket.attendanceMarked ? "✅ Attended" : "⏳ Pending"}
                </Text>
              </HStack>
            </VStack>

            {/* Close Button */}
            <Button
              colorScheme="blue"
              variant="solid"
              size="lg"
              w="full"
              onClick={onClose}
            >
              Close Ticket
            </Button>
          </VStack>
        </CardBody>
      </CardRoot>
    </Box>
  );
};

export default TicketDisplay;
