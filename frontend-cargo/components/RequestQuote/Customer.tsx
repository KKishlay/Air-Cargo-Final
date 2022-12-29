import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { QuotesForm } from "../../src/types/Types";
type CustomerProps = {
  register: UseFormRegister<QuotesForm>;
  errors: FieldErrors<QuotesForm>;
};
const Customer = (props: CustomerProps) => {
  const { register, errors } = props;
  return (
    <Box
      w="full"
      boxShadow="md"
      backgroundColor="white"
      px="100px"
      pb="100px"
      pt="50px"
      display="flex"
      border={"0.8px solid #DDDDDD"}
      borderRadius="20px"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="20px" fontWeight={500} mb="50px">
        Customer Details
      </Text>
      <VStack spacing="20px">
        <FormControl isInvalid={Boolean(errors?.customer_name)}>
          <Input
            w="300px"
            fontSize="13px"
            {...register("customer_name", { required: true })}
            placeholder="Customer Name"
          />
          <FormErrorMessage fontSize="12px">This is Required</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors?.term_of_shipment)}>
          <Input
            fontSize="13px"
            {...register("term_of_shipment", { required: true })}
            placeholder="Term of Shipment"
          />
          <FormErrorMessage fontSize="12px">This is Required</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors?.ready_date)}>
          <Input
            type="date"
            fontSize="13px"
            {...register("ready_date", { required: true })}
          />
          <FormErrorMessage fontSize="12px">This is Required</FormErrorMessage>
        </FormControl>
      </VStack>
    </Box>
  );
};
export default Customer;
