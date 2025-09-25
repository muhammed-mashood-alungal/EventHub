import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schema/auth.schema";
import type { IRoles, ISignupInput } from "../../types/auth.types";
import { InputField } from "../ui/Input-field";
import OrganizationForm from "./OrganizationForm";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.services";
import { useAuth } from "../../contexts/auth.context";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { useToastNotifier } from "../../contexts/toast.context";

type SignupFormData = ISignupInput & {
  confirmPassword: string;
};

const SignupForm: React.FC<{ role: IRoles }> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();
  const handleError = useErrorHandler();
  const { notifySuccess } = useToastNotifier();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    defaultValues: {
      role: "user",
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { confirmPassword, ...submitData } = data;
      const { token, user, message } = await AuthService.register({
        ...submitData,
        role: role,
      });
      setAuth(user, token);
      notifySuccess(message);
      navigate(user.role == "organizer" ? "/org/events" : from, {
        replace: true,
      });
    } catch (error) {
      handleError(error, "Signup error");
    }
  };

  return (
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
              Create Your Account
            </Heading>
            <Text color="gray.600" mt={2}>
              Join EventHub and start managing events
            </Text>
          </Box>

          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={5} align="stretch">
              <HStack gap={4}>
                <InputField
                  label="Name"
                  name="name"
                  register={register}
                  error={errors.name?.message}
                  placeholder="Name"
                  required
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  register={register}
                  error={errors.phone?.message}
                  placeholder="Phone number"
                  required
                />
              </HStack>

              <InputField
                label="Email Address"
                name="email"
                register={register}
                type="email"
                error={errors.email?.message}
                placeholder="Enter your email"
                required
              />

              <InputField
                label="Password"
                name="password"
                register={register}
                type="password"
                error={errors.password?.message}
                placeholder="Create a password"
                required
              />

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                register={register}
                type="password"
                error={errors.confirmPassword?.message}
                placeholder="Confirm your password"
                required
              />

              {role === "organizer" && (
                <OrganizationForm register={register} errors={errors} />
              )}

              <Button
                type="submit"
                variant="surface"
                colorScheme="blue"
                size="lg"
                w="full"
                mt={4}
                loading={isSubmitting}
                loadingText="Creating account..."
                spinner={<Spinner size="sm" />}
              >
                Create Account
              </Button>
            </VStack>
          </Box>

          <Box textAlign="center">
            <Text color="gray.600">
              Already have an account?{" "}
              <Text
                as="span"
                color="blue.500"
                fontWeight="medium"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={() => navigate("/login")}
              >
                Sign in here
              </Text>
            </Text>
            {role != "organizer" && (
              <Text color="gray.600">
                Sign Up as a organizer?{" "}
                <Text
                  as="span"
                  color="blue.500"
                  fontWeight="medium"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => navigate("/org/signup")}
                >
                  Sign Up here
                </Text>
              </Text>
            )}
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignupForm;
