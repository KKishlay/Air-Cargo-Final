import {
  VStack,
  Switch,
  FormControl,
  Input,
  FormErrorMessage,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormWatch,
} from "react-hook-form";
import { QuotesForm } from "../../src/types/Types";
type DestinationProps = {
  register: UseFormRegister<QuotesForm>;
  errors: FieldErrors<QuotesForm>;
  watch: UseFormWatch<QuotesForm>;
};
const Destination = (props: DestinationProps) => {
  const { errors, register, watch } = props;
  return (
    <Box
      w="full"
      px="100px"
      pb="100px"
      pt="40px"
      boxShadow="md"
      display="flex"
      border={"0.8px solid #DDDDDD"}
      borderRadius="20px"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="24px" mb="50px">
        Destination Details
      </Text>
      <VStack spacing="20px">
        <Box display="flex" alignItems="center">
          <Text color="grey">Destination Pickup :</Text>
          <Switch ml="30px" size="lg" {...register("destination.pickup")} />
        </Box>
        <Box display="flex" alignItems="center">
          <Text color="grey">Destination Custom :</Text>
          <Switch ml="30px" size="lg" {...register("destination.custom")} />
        </Box>
        <FormControl isInvalid={Boolean(errors?.destination?.port)}>
          <Input
            fontSize="13px"
            w="300PX"
            {...register("destination.port", { required: true })}
            placeholder="Destination Port"
          />{" "}
          <FormErrorMessage>This is Required</FormErrorMessage>
        </FormControl>
        {watch().destination?.pickup === Boolean("true") ? (
          <FormControl isInvalid={Boolean(errors?.destination?.address)}>
            <Input
              fontSize="13px"
              w="300px"
              defaultValue={""}
              {...register("destination.address", { required: true })}
              placeholder="Destination Address"
            />
            <FormErrorMessage fontSize="12px">
              This is Required
            </FormErrorMessage>
          </FormControl>
        ) : null}
      </VStack>
    </Box>
  );
};
export default Destination;