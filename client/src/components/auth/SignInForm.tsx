import { useForm } from "react-hook-form";
import { Box, Button, VStack, Text, Spinner, Heading } from "@chakra-ui/react";
import { loginSchema } from "../../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ILoginInput } from "../../types/auth.types";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.services";
import { useAuth } from "../../contexts/auth.context";
import { useToastNotifier } from "../../contexts/toast.context";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { InputField } from "../ui/Input-field";
import { useState } from "react";

function SignInForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { notifySuccess } = useToastNotifier();
  const handleError = useErrorHandler();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginInput) => {
    try {
      setIsSubmitting(true);
      const { token, user, message } = await AuthService.login(data);
      setAuth(user, token);
      notifySuccess(message);
      navigate("/");
    } catch (error) {
      handleError(error, "Login error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box
        minH="100vh"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Box
          w="full"
          maxW="md"
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack gap={6} align="stretch">
            <Box textAlign="center">
              <Heading size="lg" color="gray.800">
                Sign In to EventHub
              </Heading>
              <Text color="gray.600" mt={2}>
                Welcome back! Please sign in to your account
              </Text>
            </Box>

            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={5} align="stretch">
                {/* Email Field */}

                <InputField
                  name="email"
                  register={register}
                  error={errors.email?.message}
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  size="lg"
                  required
                />

                {/* Password Field */}

                <InputField
                  name="password"
                  register={register}
                  error={errors.password?.message}
                  label="Your Password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  size="lg"
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="surface"
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  mt={4}
                  loading={isSubmitting}
                  loadingText="Signing in..."
                  spinner={<Spinner size="sm" />}
                >
                  Sign In
                </Button>
              </VStack>
            </Box>

            <Box textAlign="center">
              <Text color="gray.600">
                Don't have an account?{" "}
                <Text
                  as="span"
                  color="blue.500"
                  fontWeight="medium"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => navigate("/signup")}
                >
                  Sign up here
                </Text>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
}

export default SignInForm;
