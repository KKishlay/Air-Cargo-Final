import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React from "react";
import axios from "axios";
import router from "next/router";
import { GetServerSidePropsContext } from "next";
import Cookies from "js-cookie";
import { GetQuotes, SingleQuote } from "../src/types/Types";
export const DateParser = (date: number) => {
  var numDate = new Date(date);
  return numDate.toDateString();
};
const SellRate = ({
  data,
  bid,
  QuoteInfo,
}: {
  data: SingleQuote[];
  bid: string;
  QuoteInfo: GetQuotes;
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SingleQuote>();
  const aid = Cookies.get("userId");
  
  const submitForm = (data: SingleQuote) => {
    const payload: SingleQuote = {
      ...data,
      booking_id: bid,
      quote_status: "Approval Pending",
    };
    axios
      .post(
        `http://localhost:9090/v1/account/${aid}/booking/${bid}/quote`,
        payload
      )
      .then(function (response) {
        router.push("/quote");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <Box w={"full"} h="full">
      <Box m="50px">
        <Box pl={"20px"}>
          <Text pl={"80px"}>
            Requested on {DateParser(parseInt(QuoteInfo.booked_on))}
          </Text>
        </Box>

        <Box
          boxShadow=" 0px 3px 5px 5px rgba(0, 0, 0, 0.25)"
          h={"90px"}
          p="30px"
          display={"flex"}
          justifyContent="space-evenly"
          mt={"20px"}

          //   bgColor="#c6d0f5"
        >
          <Box display={"flex"}>
            <Text>{QuoteInfo?.origin_port}</Text>

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
              {QuoteInfo?.door_pickup ? "Door" : "Port"}
            </Text>
            <Text mx={"4px"}> -&gt; </Text>
            <Text>{QuoteInfo?.destination_port}</Text>
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
              {QuoteInfo?.door_delivery ? "Door" : "Port"}
            </Text>
          </Box>

          <Text
            ml={"50px"}
          >{`1 container (${QuoteInfo?.cargo_weight} kgs)`}</Text>

          <VStack ml={"50px"} spacing="0" mt={0}>
            <Text fontWeight={500}>Cargo Ready Date</Text>
            <Text>{QuoteInfo?.cargo_ready_date}</Text>
          </VStack>

          <VStack ml={"60px"} spacing="0" mt={0}>
            <Text fontWeight={500}>Inco term</Text>
            <Text>{QuoteInfo?.terms_of_shipment}</Text>
          </VStack>

          <VStack ml={"60px"} spacing="0" mt={0}>
            <Text fontWeight={500}>HS Code</Text>
            <Text>{QuoteInfo?.cargo_hs_code}</Text>
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
              <Input
                borderRadius={"6px"}
                border="1px solid gray"
                w="288px"
                h={"48px"}
                type="date"
                mt={"10px"}
                {...register("validity")}
                defaultValue={data[0]?.validity}
                readOnly
              />
            </Box>

            <Box mt={"40px"} display="flex">
              <VStack alignItems="flex-start">
                <Text>Liner</Text>
                <Input
                  borderRadius={"6px"}
                  border="1px solid gray"
                  w="400px"
                  h={"48px"}
                  type="text"
                  mt={"10px"}
                  defaultValue={data[0]?.liner}
                  {...register("liner")}
                  readOnly
                />
              </VStack>

              <VStack alignItems="flex-start" ml={"90px"}>
                <Text>Total Transit</Text>
                <Input
                  borderRadius={"6px"}
                  border="1px solid gray"
                  w="262px"
                  h={"48px"}
                  type="text"
                  mt={"10px"}
                  {...register("transit_days", { valueAsNumber: true })}
                  defaultValue={data[0]?.transit_days}
                  readOnly
                />
              </VStack>

              <VStack alignItems="flex-start" ml={"90px"}>
                <Text>Free Days</Text>
                <Input
                  borderRadius={"6px"}
                  border="1px solid gray"
                  w="262px"
                  h={"48px"}
                  type="text"
                  mt={"10px"}
                  {...register("free_days", { valueAsNumber: true })}
                  defaultValue={data[0]?.free_days}
                  readOnly
                />
              </VStack>
            </Box>

            <Text mt="30px">Dates</Text>

            <Box mt={"10px"} display="flex">
              <VStack alignItems="flex-start">
                <Text>Chennai</Text>
                <Input
                  borderRadius={"6px"}
                  border="1px solid gray"
                  w="300px"
                  h={"48px"}
                  type="date"
                  mt={"10px"}
                  defaultValue={data[0]?.origin_date}
                  {...register("origin_date")}
                  readOnly
                />
              </VStack>
              <VStack alignItems="flex-start" ml={"90px"}>
                <Text>Bangalore</Text>
                <Input
                  borderRadius={"6px"}
                  border="1px solid gray"
                  w="300px"
                  h={"48px"}
                  type="date"
                  mt={"10px"}
                  defaultValue={data[0]?.destination_date}
                  {...register("destination_date")}
                  readOnly
                />
              </VStack>
            </Box>
          </Box>
          <Box w="max-content" mt="40px">
            <Text mb={"5px"}>Partner</Text>
            <Input
              w="288px"
              h={"48px"}
              type="text"
              defaultValue={data[0]?.partner}
              {...register("partner")}
              readOnly
            />
          </Box>
          {data[0].charges_info.map((field, index) => {
            return (
              <Box key={index} mt="20px">
                <Box
                  boxShadow=" 0px 10px 20px 2px rgba(0, 0, 0, 0.25)"
                  h="280px"
                  mt={"50px"}
                  p="40px"
                >
                  <Box display={"flex"} mt="20px">
                    <VStack alignItems="flex-start">
                      <Text mb={"0"}>Charges</Text>
                      <Input
                        {...register(`charges_info.${index}.name`)}
                        defaultValue={field.name}
                        readOnly
                        w="130px"
                        h={"48px"}
                        type="text"
                      />
                    </VStack>
                    <VStack ml={"39px"} alignItems="flex-start">
                      <Text mb={"0"}>Freight Type</Text>
                      <Input
                        {...register(`charges_info.${index}.freight`)}
                        defaultValue={field.freight}
                        readOnly
                        w="132px"
                        h={"48px"}
                        type="text"
                      />
                    </VStack>
                    <VStack ml={"39px"} alignItems="flex-start">
                      <Text mb={"0"}>Currency</Text>
                      <Input
                        {...register(`currency`)}
                        defaultValue={data[0].currency}
                        readOnly
                        w="132px"
                        h={"48px"}
                        type="text"
                        name="liner"
                      />
                    </VStack>
                    <VStack ml={"39px"} alignItems="flex-start">
                      <Text mb={"0"}>Buy</Text>
                      <Input
                        {...register(`charges_info.${index}.buy_rate`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        defaultValue={field.buy_rate}
                        readOnly
                        w="132px"
                        h={"48px"}
                        type="text"
                      />
                    </VStack>
                    <VStack ml={"39px"} alignItems="flex-start">
                      <Text mb={"0"}>Buy Tax</Text>
                      <Input
                        {...register(`charges_info.${index}.buy_tax`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        defaultValue={field.buy_tax}
                        readOnly
                        w="132px"
                        h={"48px"}
                        type="text"
                      />
                    </VStack>
                    <VStack ml={"39px"} alignItems="flex-start">
                      <Text mb={"0"}>Sell</Text>
                      <Input
                        {...register(`charges_info.${index}.sell_rate`, {
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
                        defaultValue={field.unit}
                        readOnly
                        w="132px"
                        h={"48px"}
                        type="text"
                      />
                    </VStack>
                  </Box>
                  <VStack mt="20px" alignItems="flex-start">
                    <Text mb={"0"}>Partner Tax</Text>
                    <Input
                      {...register(`charges_info.${index}.sell_tax`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                      w="132px"
                      h={"48px"}
                      type="text"
                    />
                  </VStack>
                </Box>
              </Box>
            );
          })}
          <Box display={"flex"} justifyContent="space-between" mt="20px">
            <Button type="submit" textAlign={"center"}>
              Submit
            </Button>
            <Text>Total</Text>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SellRate;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const router = useRouter();
  const bid = context.query?.bid;
  const aid = Cookies.get("userId");

  let response = await axios.get(
    `http://localhost:9090/v1/account/${aid}/booking/${bid}/quote`
  );
  let data = await response.data.message;
  response = await axios.get(
    `http://localhost:9090/v1/account/${aid}/booking/${bid}`
  );
  let QuoteInfo = await response.data.message;
  return {
    props: {
      bid: bid,
      data: data,
      QuoteInfo: QuoteInfo,
    },
  };
}
