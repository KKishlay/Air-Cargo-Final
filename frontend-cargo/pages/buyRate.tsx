import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import React from "react";
import axios from "axios";
import router from "next/router";
import { GetServerSidePropsContext } from "next";
import Cookies from "js-cookie";
import { GetQuotes, SingleQuote } from "../src/types/Types";
import { DateParser } from "./sellRate";

const buyRate = ({ data, bid }: { data: GetQuotes; bid: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SingleQuote>({
    defaultValues: {
      currency: "INR",
      charges_info: [
        {
          name: "",
          freight: "",
          buy_rate: undefined,
          unit: undefined,
          buy_tax: undefined,
          sell_rate: undefined,
          sell_tax: undefined,
        },
      ],
    },
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    name: "charges_info",
    control,
  });
  // type lineitem = {
  //   name: string;
  //   freight: string;
  //   buy_rate: number;
  //   buy_tax: number;
  //   unit: number;
  //   sell_rate: null;
  //   sell_tax: null;
  // };
  const submitForm = (data: SingleQuote) => {
    const payload: SingleQuote = {
      ...data,
      booking_id: bid,
      quote_status: "Sell Rate Pending",
    };
    const aid = Cookies.get("userId");
    axios
      .post(
        `http://localhost:9090/v1/account/${aid}/booking/${bid}/quote`,
        payload
      )
      .then(function (response) {
        console.log(response);
        router.push("/quote");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  console.log("buy rates", data);
  return (
    <Box w={"full"} h="full">
      <Box m="50px">
        <HStack spacing={950}>
          <Text pl={"50px"}>
            Requested on {DateParser(parseInt(data.booked_on))}
          </Text>
        </HStack>

        <Box
          boxShadow=" 0px 3px 5px 5px rgba(0, 0, 0, 0.25)"
          h={"90px"}
          p="30px"
          display={"flex"}
          justifyContent="space-evenly"
          mt={"10px"}
        >
          <Box display={"flex"}>
            <Text>{data.origin_port}</Text>

            <Text
              p="3px"
              w={"22"}
              h="22px"
              borderRadius={"4px"}
              fontSize={"12px"}
              border={"1px solid black"}
              mx="8px"
              textAlign={"center"}
            >
              {data.door_pickup ? "DOOR" : "PORT"}
            </Text>
            <Text mx={"4px"}> -&gt; </Text>
            <Text>{data.destination_port}</Text>
            <Text mx={"4px"}> -&gt; </Text>
            <Text
              mx="8px"
              p="3px"
              w={"22"}
              borderRadius={"4px"}
              h="24px"
              fontSize={"12px"}
              border={"1px solid black"}
            >
              {data.door_delivery ? "DOOR" : "PORT"}
            </Text>
          </Box>

          <Text ml={"50px"}>{`1 Container (${data.cargo_weight} kgs)`}</Text>

          <VStack ml={"50px"} spacing="0" mt={0}>
            <Text fontWeight={500}>Cargo Ready Date</Text>
            <Text>{data.cargo_ready_date}</Text>
          </VStack>

          <VStack ml={"60px"} spacing="0" mt={0}>
            <Text fontWeight={500}>Inco term</Text>
            <Text>{data.terms_of_shipment}</Text>
          </VStack>

          <VStack ml={"60px"} spacing="0" mt={0}>
            <Text fontWeight={500}>HS Code</Text>
            <Text>{data.cargo_hs_code}</Text>
          </VStack>
        </Box>

        <form onSubmit={handleSubmit(submitForm)}>
          <Box
            mt={"50px"}
            h={"500px"}
            boxShadow=" 0px 10px 20px 2px rgba(0, 0, 0, 0.25)"
            p="40px"
          >
            <Box>
              <Text>Validity</Text>
              <FormControl isInvalid={Boolean(errors?.validity)}>
                <Input
                  borderRadius={"6px"}
                  border="1px solid gray"
                  w="288px"
                  h={"48px"}
                  type="date"
                  mt={"10px"}
                  {...register("validity", { required: true })}
                />
                <FormErrorMessage>This is required</FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt={"40px"} display="flex">
              <VStack alignItems="flex-start">
                <Text>Liner</Text>
                <FormControl isInvalid={Boolean(errors?.liner)}>
                  <Input
                    borderRadius={"6px"}
                    border="1px solid gray"
                    w="400px"
                    h={"48px"}
                    type="text"
                    mt={"10px"}
                    {...register("liner", { required: true })}
                  />
                  <FormErrorMessage>This is required</FormErrorMessage>
                </FormControl>
              </VStack>

              <VStack alignItems="flex-start" ml={"90px"}>
                <Text>Total Transit</Text>
                <FormControl isInvalid={Boolean(errors?.transit_days)}>
                  <Input
                    borderRadius={"6px"}
                    border="1px solid gray"
                    w="262px"
                    h={"48px"}
                    type="text"
                    mt={"10px"}
                    {...register("transit_days", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  <FormErrorMessage>This is required</FormErrorMessage>
                </FormControl>
              </VStack>

              <VStack alignItems="flex-start" ml={"90px"}>
                <Text>Free Days</Text>
                <FormControl isInvalid={Boolean(errors?.free_days)}>
                  <Input
                    borderRadius={"6px"}
                    border="1px solid gray"
                    w="262px"
                    h={"48px"}
                    type="text"
                    mt={"10px"}
                    {...register("free_days", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  <FormErrorMessage>This is required</FormErrorMessage>
                </FormControl>
              </VStack>
            </Box>

            <Text mt="30px">Dates</Text>

            <Box mt={"10px"} display="flex">
              <VStack alignItems="flex-start">
                <Text>{data.origin_port}</Text>
                <FormControl isInvalid={Boolean(errors?.origin_date)}>
                  {" "}
                  <Input
                    borderRadius={"6px"}
                    border="1px solid gray"
                    w="300px"
                    h={"48px"}
                    type="date"
                    mt={"10px"}
                    {...register("origin_date", { required: true })}
                  />
                  <FormErrorMessage>This is required</FormErrorMessage>
                </FormControl>
              </VStack>

              <VStack alignItems="flex-start" ml={"90px"}>
                <Text>{data.destination_port}</Text>
                <FormControl isInvalid={Boolean(errors?.destination_date)}>
                  <Input
                    borderRadius={"6px"}
                    border="1px solid gray"
                    w="300px"
                    h={"48px"}
                    type="date"
                    mt={"10px"}
                    {...register("destination_date", { required: true })}
                  />
                  <FormErrorMessage>This is required</FormErrorMessage>
                </FormControl>
              </VStack>
            </Box>
          </Box>
          <Box mt="40px" w="max-content">
            <Text mb={"5px"}>Partner</Text>
            <FormControl isInvalid={Boolean(errors?.partner)}>
              <Input
                w="288px"
                h={"48px"}
                type="text"
                {...register("partner", { required: true })}
              />
            </FormControl>
          </Box>

          {fields.map((field, index) => {
            return (
              <Box key={field.id} mt="20px">
                <Box
                  boxShadow=" 0px 10px 20px 2px rgba(0, 0, 0, 0.25)"
                  h="260px"
                  mt={"50px"}
                  p="40px"
                >
                  <Box display={"flex"} mt="20px">
                    <VStack alignItems="flex-start">
                      <Text mb={"0"}>Charges</Text>
                      <FormControl>
                        <Input
                          {...register(`charges_info.${index}.name`, {
                            required: true,
                          })}
                          w="288px"
                          h={"48px"}
                          type="text"
                        />
                      </FormControl>
                    </VStack>
                    <VStack ml={"39px"} alignItems="flex-start">
                      <Text mb={"0"}>Freight Type</Text>
                      <Input
                        {...register(`charges_info.${index}.freight`, {
                          required: true,
                        })}
                        w="132px"
                        h={"48px"}
                        type="text"
                      />
                    </VStack>
                    <VStack ml={"39px"} alignItems="flex-start">
                      <Text mb={"0"}>Currency</Text>
                      <Input
                        {...register(`currency`, {
                          required: true,
                        })}
                        readOnly
                        defaultValue="INR"
                        w="132px"
                        h={"48px"}
                        type="text"
                      />
                    </VStack>
                    <VStack ml={"39px"} alignItems="flex-start">
                      <Text mb={"0"}>Buy</Text>
                      <Input
                        {...register(`charges_info.${index}.buy_rate`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        w="132px"
                        h={"48px"}
                        type="text"
                      />
                    </VStack>
                    <VStack ml={"39px"} alignItems="flex-start">
                      <Text mb={"0"}>Units</Text>
                      <Input
                        {...register(`charges_info.${index}.unit`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        w="132px"
                        h={"48px"}
                        type="text"
                      />
                    </VStack>
                    <VStack ml={"39px"} alignItems="flex-start">
                      <Text mb={"0"}>Partner Tax</Text>
                      <Input
                        {...register(`charges_info.${index}.buy_tax`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        w="132px"
                        h={"48px"}
                        type="text"
                      />
                    </VStack>

                    {fields.length > 1 ? (
                      <Text
                        as="button"
                        cursor={"pointer"}
                        color="red"
                        ml="20px"
                        mt={"30px"}
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        x
                      </Text>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            );
          })}

          <Box textAlign={"end"} mr="40px">
            <Button
              type="button"
              bg={"transparent"}
              border="none"
              color={"#94b8f2"}
              cursor="pointer"
              mt="20px"
              onClick={() => {
                append({
                  name: "",
                  freight: "",
                  buy_rate: 0,
                  unit: 0,
                  buy_tax: 0,
                  sell_rate: 0,
                  sell_tax: 0,
                });
              }}
            >
              + add line item
            </Button>
          </Box>

          <Button type="submit" textAlign={"center"}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default buyRate;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  
  const bid = context.query?.bid;
  const aid = Cookies.get("userId");
  const endpoint = `http://localhost:9090/v1/account/${aid}/booking/${bid}`;

  const response = await axios.get(endpoint);
  const data = response.data.message;
  console.log(data);
  return {
    props: {
      bid: bid,
      data: data,
    },
  };
}
