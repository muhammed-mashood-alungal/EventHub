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
import type { IEventStats } from "../../types/ticket.types";

interface ManageEventProps {
  event: Event;
  onScanClick: (action: string) => void;
  stats : IEventStats
}

const ManageEvent: React.FC<ManageEventProps> = ({ event, onScanClick  , stats}) => {

  return (
    <CardRoot bg={"gray.200"} color={"gray.900"} border={0}>
      <CardBody>
        <VStack align="stretch" gap={6}>
          <Heading size="md" color="gray.700">
            Manage Event
          </Heading>

          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            <StatRoot>
              <StatLabel>Attendance</StatLabel>
              <Stat.ValueText>{stats?.participated}</Stat.ValueText>
              <StatHelpText>
                of {stats?.totalRegistrations}participants
              </StatHelpText>
            </StatRoot>

            {event.meals.breakfast && (
              <StatRoot>
                <StatLabel>Breakfast Served</StatLabel>
                <Stat.ValueText>{stats?.food?.breakfast || 0}</Stat.ValueText>
                <StatHelpText>of {stats?.participated} attended</StatHelpText>
              </StatRoot>
            )}

            {event.meals.lunch && (
              <StatRoot>
                <StatLabel>Lunch Served</StatLabel>
                <Stat.ValueText>{stats?.food?.lunch || 0}</Stat.ValueText>
                <StatHelpText>of {stats?.participated} attended</StatHelpText>
              </StatRoot>
            )}

            {event.meals.dinner && (
              <StatRoot>
                <StatLabel>Dinner Served</StatLabel>
                <Stat.ValueText>{stats?.food?.dinner || 0}</Stat.ValueText>
                <StatHelpText>of {stats?.participated} attended</StatHelpText>
              </StatRoot>
            )}
          </SimpleGrid>

          <HStack justify="center" wrap="wrap" gap={4}>
            <CustomButton
              colorScheme="green"
              leftIcon={<Check />}
              onClick={() => onScanClick("attendance")}
            >
              Mark Attendance
            </CustomButton>

            {event.meals.breakfast && (
              <CustomButton
                colorScheme="orange"
                onClick={() => onScanClick("food-breakfast")}
              >
                Serve Breakfast
              </CustomButton>
            )}

            {event.meals.lunch && (
              <CustomButton
                colorScheme="yellow"
                onClick={() => onScanClick("food-lunch")}
              >
                Serve Lunch
              </CustomButton>
            )}

            {event.meals.dinner && (
              <CustomButton
                colorScheme="red"
                onClick={() => onScanClick("food-dinner")}
              >
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
