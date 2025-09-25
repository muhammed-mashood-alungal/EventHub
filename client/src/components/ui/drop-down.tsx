import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Button, 
  VStack, 
  Text, 
  Portal 
} from '@chakra-ui/react';

interface DropdownOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select option"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

 
  // Calculate position when opening
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <>
      <Button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        justifyContent="space-between"
        minW="180px"
        bg="gray.50"
        borderColor="gray.300"
        _hover={{ borderColor: "gray.400" }}
        _focus={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px #3182ce",
          bg: "white",
        }}
      >
        <Text color={selectedOption ? "gray.800" : "gray.500"}>
          {selectedOption?.label || placeholder}
        </Text>
      </Button>

      {isOpen && (
        <Portal>
          <Box
            ref={dropdownRef}
            position="absolute"
            top={`${position.top}px`}
            left={`${position.left}px`}
            width={`${position.width}px`}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            shadow="lg"
            zIndex={1000}
            maxH="200px"
            overflowY="auto"
          >
            <VStack gap={0} align="stretch">
              {options.map((option) => (
                <Box
                  key={option.value}
                  px={3}
                  py={2}
                  cursor="pointer"
                  bg={value === option.value ? "blue.50" : "white"}
                  _hover={{ bg: "gray.50" }}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <Text fontSize="sm" color="gray.800">
                    {option.label}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </Portal>
      )}
    </>
  );
};

export default CustomSelect;