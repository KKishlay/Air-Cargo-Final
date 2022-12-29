import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  Box,
  Switch,
} from "@chakra-ui/react";
import React from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { QuotesForm } from "../../src/types/Types";
import Toggle from "../Toggle";
type OriginProps = {
  register: UseFormRegister<QuotesForm>;
  errors: FieldErrors<QuotesForm>;
  watch: UseFormWatch<QuotesForm>;
};
const Origin = (props: OriginProps) => {
  const { errors, register, watch } = props;
  return (
    <Box
      w="full"
      px="100px"
      pb="100px"
      pt="40px"
      border={"0.8px solid #DDDDDD"}
      borderRadius="20px"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="24px" mb="50px">
        Origin Details
      </Text>
      <VStack spacing="20px">
        <Box display="flex" alignItems="center">
          <Text color="grey">Origin Pickup :</Text>
          <Switch ml="30px" size="lg" {...register("origin.pickup")} />
        </Box>
        <Box display="flex" alignItems="center">
          <Text color="grey">Origin Custom :</Text>
          <Switch ml="30px" size="lg" {...register("origin.custom")} />
        </Box>
        <FormControl isInvalid={Boolean(errors?.origin?.port)}>
          <Input
            fontSize="13px"
            w="300PX"
            {...register("origin.port", { required: true })}
            placeholder="Origin Port"
          />{" "}
          <FormErrorMessage>This is Required</FormErrorMessage>
        </FormControl>
        {watch().origin?.pickup === Boolean("true") ? (
          <FormControl isInvalid={Boolean(errors?.origin?.address)}>
            <Input
              fontSize="13px"
              w="300px"
              defaultValue={""}
              {...register("origin.address", { required: true })}
              placeholder="Origin Address"
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
export default Origin;