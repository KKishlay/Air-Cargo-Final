import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSidePropsContext } from "next";
import router from "next/router";
import React, { useState } from "react";
import { GetQuotes, SingleQuote } from "../src/types/Types";

const DateParser = (date: number) => {
  var numDate = new Date(date);
  return numDate.toDateString();
};

const Summary = ({
  bid,
  data,
  QuoteInfo,
}: {
  bid: string;
  data: SingleQuote[];
  QuoteInfo: GetQuotes;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userRole = Cookies.get("role");
  if (data == null) {
    return (
      <Box>
        <Box>
          {userRole === "Customer" || userRole === "SalesExec" ? (
            <Text>Buy Rates Pending !!!</Text>
          ) : (
            <Box
              as="button"
              onClick={() => {
                router.push({
                  pathname: "/buyRate",
                  query: { bid: bid },
                });
              }}
            >
              <Text>Add Buy Rates</Text>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
  const length = data?.length;
  if (data[length - 1].quote_status == "Sell Rate Pending")
    return (
      <Box>
        <Box>
          {userRole === "Customer" || userRole === "ProcExec" ? (
            <Text>Sell Rates Pending !!!</Text>
          ) : (
            <Box
              as="button"
              onClick={() => {
                router.push({
                  pathname: "/sellRate",
                  query: { bid: bid },
                });
              }}
            >
              <Text>Add Sell Rates</Text>
            </Box>
          )}
        </Box>
      </Box>
    );
  else if (data[length - 1].quote_status == "Approval Pending") {
    const booking = data[length - 1];
    console.log(booking);
    return (
      <Box w={"full"} h="full">
        <Box m={"50px"}>
          <Box pl={"20px"}>
            <Text pl={"80px"}>
              {DateParser(parseInt(QuoteInfo?.booked_on))}
            </Text>
          </Box>
          <Box
            boxShadow=" 0px 10px 20px 2px rgba(0, 0, 0, 0.25)"
            h={"90px"}
            p="30px"
            display={"flex"}
            justifyContent="space-evenly"
            // bgColor="#c6d0f5"
            borderRadius={"4px"}
            mt="20px"
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

          <Box
            boxShadow=" 0px 10px 20px 2px rgba(0, 0, 0, 0.25)"
            w={"600px"}
            h={"400px"}
            p="30px"
            mx={"auto"}
            mt="70px"
          >
            <Text>Rate Summary</Text>
            <Divider mt={"10px"} />

            <Box mt={"30px"} justifyContent={"space-between"}>
              {booking.charges_info.map((item, idx) => {
                return (
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Text>{item.name}</Text>
                    </Box>
                    <Box>
                      <Text>
                        Rs. {(item.sell_rate * item.sell_tax * item.unit) / 100}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box display={"flex"} justifyContent="space-between" mt={"30px"}>
              <Box>
                <Text>Total</Text>
                <Text>Exclusive of taxes</Text>
              </Box>
              <Box>
                <Text>
                  Rs.
                  {booking.charges_info.reduce((accumulator, object) => {
                    return (
                      accumulator +
                      ((object.sell_rate || 0) *
                        (object.sell_tax || 0) *
                        (object.unit || 0)) /
                        100
                    );
                  }, 0)}
                </Text>
              </Box>
            </Box>

            <Button
              mt={"70px"}
              ml={"30px"}
              bg="#8ec5e8"
              border={"none"}
              w={"200px"}
              h="50px"
              fontSize={"20px"}
              borderRadius="5px"
              onClick={() => {
                let payload: SingleQuote = {
                  ...booking,
                  quote_status: "Approved",
                };
                const aid = Cookies.get("userId");
                axios
                  .post(
                    `http://localhost:9090/v1/account/${aid}/booking/${bid}/quote`,
                    payload
                  )
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log("error", error);
                  });
                onOpen();
              }}
            >
              Place Booking
            </Button>
            <Button
              mt={"70px"}
              ml={"70px"}
              bg="#8ec5e8"
              border={"none"}
              w={"200px"}
              h="50px"
              fontSize={"20px"}
              borderRadius="5px"
              onClick={() => {
                let payload: SingleQuote = {
                  ...booking,
                  quote_status: "Rejected",
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
              }}
            >
              Reject
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent w={"447px"} h={"368px"}>
                <ModalCloseButton />
                <ModalBody>
                  <Box
                    pt={"92px"}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <Box
                      w={"90px"}
                      height="90px"
                      borderRadius={"50%"}
                      pt={"20px"}
                      bg="#c6d0f5"
                    >
                      <img src="thumbs-up.png" width={"90px"} height="90px" />
                    </Box>
                    <Text fontSize={"24px"} mt="10px">
                      Your booking is confirmed
                    </Text>
                    <Button
                      mt={"40px"}
                      bg="#c6d0f5"
                      onClick={() => {
                        router.push("/booking");
                        onClose();
                      }}
                    >
                      Continue
                    </Button>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Box>
    );
  } else if (data[length - 1].quote_status == "Rejected") {
    return (
      <Box>
        <Text>Booking was Rejected !!!! Generate A new Booking</Text>
      </Box>
    );
  } else {
    router.push("/quote");
  }
};

export default Summary;

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
  console.log(data);
  return {
    props: {
      bid: bid,
      data: data,
      QuoteInfo: QuoteInfo,
    },
  };
}
