import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Textarea,
  SimpleGrid,
  Heading,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  createListCollection,
  Checkbox,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Event, EventFormData } from "../../types/events.types";
import { eventSchema } from "../../schema/event.schema";
import { InputField } from "../ui/Input-field";
import "react-datepicker/dist/react-datepicker.css";
import { categoriesNames } from "../data/categories";

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  initialData?: Partial<EventFormData>;
  isEditing?: boolean;
}

export function EventForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      venue: "",
      category: "Conference",
      startTime: "",
      endTime: "",
      foodIncluded: false,
      meals: { breakfast: false, lunch: false, dinner: false, drinks: false },
      guests: [],
      capacity: 0,
      ...initialData,
    },
  });

  console.log(initialData);

  const foodIncluded = watch("foodIncluded");
  const meals = watch("meals");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  const categories = createListCollection({
    items: categoriesNames.map((name) => ({ label: name, value: name })),
  });

  return (
    <Box bg="white" p={6} borderRadius="lg" mx="auto">
      <VStack gap={6} align="stretch">
        <Heading size="md" color="black">
          {isEditing ? "Update Event" : "Create New Event"}
        </Heading>

        <Box as="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <VStack gap={4} align="stretch">
            {/* Basic Information */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <InputField
                label="Event Title"
                name="title"
                register={register}
                placeholder="Enter event title"
                error={errors.title?.message}
                required
              />

              <Box>
                <Text fontSize="sm" mb={1} color="blackAlpha.700">
                  Category
                </Text>

                <SelectRoot collection={categories} {...register("category")}>
                  <SelectTrigger
                    bg="white"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce",
                    }}
                    color="black"
                  >
                    <SelectValueText
                      placeholder={initialData?.category || "Conference"}
                    />
                  </SelectTrigger>

                  <SelectContent
                    position="absolute"
                    zIndex={1000}
                    bg="white"
                    color={"black"}
                    width={"1/3"}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    boxShadow="lg"
                    maxH="200px"
                    overflowY="auto"
                  >
                    {categories.items.map((item) => (
                      <SelectItem
                        key={item.value}
                        item={item.value}
                        _hover={{ bg: "blue.50" }}
                        _focus={{ bg: "blue.100" }}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>

                {errors.category && (
                  <Text fontSize="sm" color="red.500" mt={1}>
                    {errors.category.message}
                  </Text>
                )}
              </Box>
            </SimpleGrid>

            <Box>
              <Text fontSize="sm" mb={1} color="blackAlpha.700">
                Description
              </Text>
              <Textarea
                {...register("description")}
                placeholder="Enter event description"
                rows={6}
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px #3182ce",
                }}
                color="black"
              />
              {errors.description && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  {errors.description.message}
                </Text>
              )}
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <InputField
                label="Venue"
                name="venue"
                register={register}
                placeholder="Enter event venue"
                error={errors.venue?.message}
                required
              />
              <InputField
                label="Capacity"
                name="capacity"
                type="number"
                register={register}
                placeholder="Enter Maximum Capacity"
                error={errors.capacity?.message}
                required
              />
            </SimpleGrid>

            {/* Date and Time */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <InputField
                label="Start Date & Time"
                name="startTime"
                type="datetime-local"
                register={register}
                error={errors.startTime?.message}
                required
              />

              <InputField
                label="End Date & Time"
                name="endTime"
                type="datetime-local"
                register={register}
                error={errors.endTime?.message}
                required
              />
            </SimpleGrid>

            <VStack align="flex-start" gap={2}>
              <Button
                type="button"
                onClick={() => append({ name: "", email: "", role: "" })}
              >
                + ADD Guest
              </Button>

              {fields.map((field, index) => (
                <HStack key={field.id} gap={3} align="flex-start">
                  <VStack align="flex-start" gap={1}>
                    <InputField
                      label=""
                      name={`guests.${index}.name`}
                      register={register}
                      error=""
                      placeholder="Name of Guest"
                    />
                    {errors.guests?.[index]?.name && (
                      <Text color="red.500" fontSize="sm">
                        {errors.guests[index]?.name.message}
                      </Text>
                    )}
                  </VStack>

                  <VStack align="flex-start" gap={1}>
                    <InputField
                      label=""
                      name={`guests.${index}.email`}
                      register={register}
                      error=""
                      placeholder="Email"
                    />
                    {errors.guests?.[index]?.email && (
                      <Text color="red.500" fontSize="sm">
                        {errors.guests[index]?.email.message}
                      </Text>
                    )}
                  </VStack>

                  <VStack align="flex-start" gap={1}>
                    <InputField
                      label=""
                      name={`guests.${index}.role`}
                      register={register}
                      error=""
                      placeholder="Role"
                    />
                    {errors.guests?.[index]?.role && (
                      <Text color="red.500" fontSize="sm">
                        {errors.guests[index]?.role.message}
                      </Text>
                    )}
                  </VStack>

                  <Button type="button" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </HStack>
              ))}
            </VStack>

            {/* Event Settings */}
            <VStack align="stretch" gap={3}>
              <Heading size="sm" color="black">
                Event Settings
              </Heading>

              <VStack align="flex-start" gap={2}>
                <Checkbox.Root defaultChecked={initialData?.foodIncluded}>
                  <Checkbox.HiddenInput {...register("foodIncluded")} />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Text fontSize="sm" color="black">
                    Food will be provided
                  </Text>
                  <Checkbox.Label />
                </Checkbox.Root>
              </VStack>
              {errors.foodIncluded && (
                <Text fontSize="sm" color="red.500" mt={1}>
                  {errors.foodIncluded.message}
                </Text>
              )}
            </VStack>

            {/* Food Menu */}
            {foodIncluded && (
              <Box>
                <Heading size="sm" color="black" mb={3}>
                  Food Menu Information
                </Heading>
                {(Object.keys(meals) as (keyof Event["meals"])[]).map(
                  (type) => (
                    <Checkbox.Root
                      ml={5}
                      defaultChecked={initialData?.meals?.[type]}
                    >
                      <Checkbox.HiddenInput
                        {...register(`meals.${type}`)}
                        name={`meals.${type}`}
                        onChange={() => {
                          setValue(`meals.${type}`, !meals[type], {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                      />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Text fontSize="sm" color="black">
                        {type} will be provided
                      </Text>
                      <Checkbox.Label />
                    </Checkbox.Root>
                  )
                )}

                {errors.meals && (
                  <Text fontSize="sm" color="red.500" mt={1}>
                    {errors.meals.message}
                  </Text>
                )}
              </Box>
            )}

            <HStack justify="flex-end" gap={3} pt={4}>
              <Button
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                //   loading={isSubmitting}
                //  loadingText={isEditing ? "Updating..." : "Creating..."}
              >
                {isEditing ? "Update Event" : "Create Event"}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
