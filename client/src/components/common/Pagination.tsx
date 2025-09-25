import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => (
  <HStack gap={2}>
    <Button
      aria-label="Previous page"
      size="sm"
      variant="outline"
      disabled={currentPage === 1}
      onClick={() => currentPage != 1 && onPageChange(currentPage - 1)}
      color="gray.600"
      borderColor="gray.300"
      _hover={{
        bg: "gray.100",
        borderColor: "gray.400",
      }}
    >
      <Icon as={ChevronLeft} boxSize={4} mr={1} /> Prev
    </Button>

    <Text fontSize="sm" color="gray.600">
      {currentPage} of {totalPages}
    </Text>

    <Button
      aria-label="Next page"
      size="sm"
      variant="outline"
      disabled={currentPage === totalPages}
      onClick={() =>
        currentPage != totalPages && onPageChange(Number(currentPage) + 1)
      }
      color="gray.600"
      borderColor="gray.300"
      _hover={{
        bg: "gray.100",
        borderColor: "gray.400",
      }}
    >
      Next <Icon as={ChevronRight} boxSize={4} ml={1} />
    </Button>
  </HStack>
);
