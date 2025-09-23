import { Input, Text, Box } from "@chakra-ui/react";
import { type FieldValues, type UseFormRegister } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: keyof T | string;
  register: UseFormRegister<T>;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  optional?: boolean;
}

export function InputField<T extends FieldValues>({
  label,
  name,
  register,
  required = false,
  type = "text",
  placeholder = "",
  error,
  size = "md",
  optional = false,
}: InputFieldProps<T>) {
  return (
    <Box>
      <Text fontSize="sm" mb={1} color="blackAlpha.700">
        {label} {optional ? "(Optional)" : ""}
      </Text>
      <Input
        type={type}
        placeholder={placeholder}
        size={size}
        {...register(name as any, { required })}
        bg="white"
        borderColor="gray.300"
        _hover={{ borderColor: "gray.400" }}
        _focus={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px #3182ce",
        }}
        onKeyDown={(e) => {
          if (e.key === " " && (name === "phone" || type === "password")) {
            e.preventDefault();
          }
        }}
        color="black"
      />
      {error && (
        <Text fontSize="sm" color="red.500" mt={1}>
          {error}
        </Text>
      )}
    </Box>
  );
}
