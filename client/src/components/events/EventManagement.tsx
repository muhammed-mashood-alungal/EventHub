import {
  CardBody,
  CardRoot,
  Heading,
  HStack,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatRoot,
  VStack,
} from "@chakra-ui/react";
import CustomButton from "../ui/button";
import type { Event } from "../../types/events.types";
import { Check } from "lucide-react";


interface ManageEventProps {
  event: Event;
  onMarkAttendance: () => void;
  onServeBreakfast: () => void;
  onServeLunch: () => void;
  onServeDinner: () => void;
}

const ManageEvent: React.FC<ManageEventProps> = ({
  event,
  onMarkAttendance,
  onServeBreakfast,
  onServeLunch,
  onServeDinner,
}) => {
  const attendedCount = 50;
  const breakfastCount = 20;
  const lunchCount = 30;
  const dinnerCount = 40;

  return (
    <CardRoot bg={'gray.200'} color={'gray.900'} border={0}>
      <CardBody>
        <VStack align="stretch" gap={6}>
          <Heading size="md" color="gray.700">
            Manage Event
          </Heading>

          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            <StatRoot>
              <StatLabel>Attendance</StatLabel>
              <Stat.ValueText>{attendedCount}</Stat.ValueText>
              <StatHelpText>of {10} participants</StatHelpText>
            </StatRoot>

            {event.meals.breakfast && (
              <StatRoot>
                <StatLabel>Breakfast Served</StatLabel>
                <Stat.ValueText>{breakfastCount}</Stat.ValueText>
                <StatHelpText>of {attendedCount} attended</StatHelpText>
              </StatRoot>
            )}

            {event.meals.lunch && (
              <StatRoot>
                <StatLabel>Lunch Served</StatLabel>
                <Stat.ValueText>{lunchCount}</Stat.ValueText>
                <StatHelpText>of {attendedCount} attended</StatHelpText>
              </StatRoot>
            )}

            {event.meals.dinner && (
              <StatRoot>
                <StatLabel>Dinner Served</StatLabel>
                <Stat.ValueText>{dinnerCount}</Stat.ValueText>
                <StatHelpText>of {attendedCount} attended</StatHelpText>
              </StatRoot>
            )}
          </SimpleGrid>

          <HStack justify="center" wrap="wrap" gap={4}>
            <CustomButton
              colorScheme="green"
              leftIcon={<Check />}
              onClick={onMarkAttendance}
            >
              Mark Attendance
            </CustomButton>

            {event.meals.breakfast && (
              <CustomButton colorScheme="orange" onClick={onServeBreakfast}>
                Serve Breakfast
              </CustomButton>
            )}

            {event.meals.lunch && (
              <CustomButton colorScheme="yellow" onClick={onServeLunch}>
                Serve Lunch
              </CustomButton>
            )}

            {event.meals.dinner && (
              <CustomButton colorScheme="red" onClick={onServeDinner}>
                Serve Dinner
              </CustomButton>
            )}
          </HStack>
        </VStack>
      </CardBody>
    </CardRoot>
  );
};


export default ManageEvent;
