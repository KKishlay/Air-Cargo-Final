import { Box, Text, HStack } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSidePropsContext } from "next/types";
import React from "react";
import { GetQuotes } from "../src/types/Types";
import { DateParser } from "./sellRate";

const Tasks = ({data, bid}:{data:GetQuotes; bid:string}) => {
  return (
    <>
      <Box w="full" h="full">
        <Box
          w={"600px"}
          h="350px"
          mx="auto"
          mt="100px"
          boxShadow=" 0px 3px 5px 5px rgba(0, 0, 0, 0.25)"
          bg={'#bfb9a6'}
          pt="60px"
          pl="80px"
        >
          <HStack fontWeight={500}>
            <Text>Booking Details -&gt; </Text>
            <Box display={"flex"}>
              <Text>{data?.origin_port}</Text>

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
                {data?.door_pickup ? 'DOOR' : 'PORT'}
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
                {data?.door_delivery ? 'DOOR' : 'PORT'}
              </Text>
            </Box>
          </HStack>
          <HStack pt={"30px"} fontWeight={500}>
            <Text>Booked on -&gt; </Text>
            <Text>{DateParser(parseInt(data.booked_on))}</Text>
          </HStack>
          <HStack pt={"30px"} fontWeight={500}>
            <Text>Inco term -&gt;</Text>
            <Text>{data.terms_of_shipment}</Text>
          </HStack>
          <HStack pt={"30px"} fontWeight={500}>
            <Text>HS Code -&gt;</Text>
            <Text>{data.cargo_hs_code}</Text>
          </HStack>
          <HStack pt={"30px"} fontWeight={500}>
            <Text>Cargo ready date-&gt;</Text>
            <Text>{data.cargo_ready_date}</Text>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default Tasks;


export async function getServerSideProps(context: GetServerSidePropsContext) {
  
  const bid = context.query?.bid;
  const aid = Cookies.get("userId");
  const endpoint = `http://localhost:9090/v1/account/${aid}/booking/${bid}`;

  const response = await axios.get(endpoint);
  const data = response.data.message;
  
  return {
    props: {
      bid: bid,
      data: data,
    },
  };
}
