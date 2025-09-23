import { Box, Text, VStack } from "@chakra-ui/react";
import { InputField } from "../ui/Input-field";
import type { FieldValues, UseFormRegister } from "react-hook-form";

interface OrganizationFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: any;
}

function OrganizationForm<T extends FieldValues>({
  register,
  errors,
}: OrganizationFormProps<T>) {
  return (
    <>
      <Box
        p={4}
        bg="blue.50"
        borderRadius="md"
        border="1px solid"
        borderColor="blue.200"
      >
        <Text fontWeight="medium" mb={3} color="blue.600">
          Organization Details
        </Text>
        <VStack gap={4}>
          <InputField
            
            label="Organization Name"
            name="organization.name"
            register={register}
            error={errors.organization?.name?.message}
            placeholder="Your organization name"
            required
          />

          <InputField
            label="Organization Address"
            name="organization.address"
            register={register}
            error={errors.organization?.address?.message}
            placeholder="Organization address"
            required
          />

          <InputField
            label="Website"
            name="organization.website"
            register={register}
            error={errors.organization?.website?.message}
            placeholder="https://www.example.com"
            optional
          />
        </VStack>
      </Box>
    </>
  );
}

export default OrganizationForm;
