import React from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  HStack,
  Alert,
} from "@chakra-ui/react";
import { Shield, Home, ArrowLeft, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UnauthorizedProps {
  message?: string;
  showLoginButton?: boolean;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  loginPath?: string;
  requiresRole?: string;
}

const Unauthorized: React.FC<UnauthorizedProps> = ({
  message = "You don't have permission to access this resource.",
  showLoginButton = true,
  showBackButton = true,
  showHomeButton = true,
  loginPath = "/login",
}) => {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg="gray.100" display="flex" alignItems="center">
      <Container maxW="md" py={20}>
        <VStack gap={8} align="center" textAlign="center">
          {/* 403 Number */}
          <VStack gap={4}>
            <Text
              fontSize={{ base: "6xl", md: "8xl" }}
              fontWeight="bold"
              color="black"
              lineHeight="none"
            >
              403
            </Text>
            <Heading
              size={{ base: "lg", md: "xl" }}
              color="gray.800"
              fontWeight="semibold"
            >
              Access Denied
            </Heading>
          </VStack>

          {/* Message */}
          <Text
            fontSize="lg"
            color="gray.600"
            maxW="400px"
            lineHeight="relaxed"
          >
            {message}
          </Text>

          {/* Role Requirement Alert */}

          {/* Illustration */}
          <Box
            w="120px"
            h="120px"
            bg="black.50"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="3px solid"
            borderColor="black"
          >
            <Icon as={Shield} boxSize={12} color="red.400" />
          </Box>

          {/* Action Buttons */}
          <VStack gap={3} w="full">
            <HStack gap={3} wrap="wrap" justify="center">
              {showLoginButton && (
                <Button
                  colorScheme="blue"
                  variant="solid"
                  size="lg"
                  onClick={() => navigate(loginPath)}
                  minW="140px"
                >
                  Sign In
                </Button>
              )}

              {showHomeButton && (
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/")}
                  minW="140px"
                  color="gray.700"
                  borderColor="gray.300"
                  _hover={{
                    bg: "gray.50",
                    borderColor: "gray.400",
                  }}
                >
                  Go Home
                </Button>
              )}
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Unauthorized;
