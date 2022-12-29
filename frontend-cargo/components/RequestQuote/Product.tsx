import {
  VStack,
  FormControl,
  FormErrorMessage,
  Input,
  Box,
  Text,
  Switch,
} from "@chakra-ui/react";
import React from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { QuotesForm } from "../../src/types/Types";
import Container from "../Container";
import Toggle from "../Toggle";
type ProductProps = {
  register: UseFormRegister<QuotesForm>;
  control: Control<QuotesForm>;
  errors: FieldErrors<QuotesForm>;
  setValue: UseFormSetValue<QuotesForm>;
  watch: UseFormWatch<QuotesForm>;
};
const Product = (props: ProductProps) => {
  const { control, errors, register, setValue, watch } = props;
  const defaultValue: QuotesForm["products"]["items"] =
    watch()?.products?.items;
  return (
    <Box
      w="500px"
      px="100px"
      pt="40px"
      boxShadow="md"
      border={"0.8px solid #DDDDDD"}
      borderRadius="20px"
      pb="50px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="24px" mb="50px">
        Product Details
      </Text>
      <VStack spacing="20px">
        <Box display="flex" alignItems="center">
          <Text color="grey">Dangerous :</Text>
          <Switch ml="30px" size="lg" {...register("dangerous")} />
        </Box>
        <Box display="flex" alignItems="center">
          <Text color="grey">Stackable :</Text>
          <Switch ml="30px" size="lg" {...register("stackable")} />
        </Box>
        <FormControl isInvalid={Boolean(errors?.hs_code)}>
          <Input
            fontSize="14px"
            {...register("hs_code", { required: true })}
            placeholder="HS Code"
          />
          <FormErrorMessage>This is Required</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!Boolean(watch()?.products?.items)}>
          <Container setValue={setValue} defaultValue={defaultValue} />
          <FormErrorMessage>This is Required</FormErrorMessage>
        </FormControl>
      </VStack>
    </Box>
  );
};
export default Product;