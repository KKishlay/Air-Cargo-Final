import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import router from "next/router";
import React from "react";
import { GetQuotes } from "../../src/types/Types";

const QuoteItem = ({ quote }: { quote: GetQuotes }) => {
  return (
    <Box w="300px" border={"1px solid #DDDDDD"} borderRadius="6px">
      <Box
        borderBottom={"1px solid #DDDDDD"}
        w="full"
        px="20px"
        display="flex"
        flexDirection="column"
        
      >
        <Box
          w="full"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt="20px"
          pb="20px"
        >
          <Text fontSize="10px" color="#666666">
            {quote.cargo_ready_date}
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontSize="12px"
            fontWeight={500}
            color="#333333"
           
          >
            <Box>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.41003 8.14115L6.88088 7.6703C7.06328 7.4879 7.01662 7.26309 6.77907 7.16977L3.73767 5.96084C3.25835 5.76996 3.16503 5.32032 3.52558 4.95977L4.08551 4.39985C4.37395 4.1114 4.92539 3.99263 5.30291 4.14958L8.76001 5.52817C8.86181 5.56211 9.01028 5.53242 9.08663 5.45606L10.3846 4.15806C10.7919 3.75084 11.5808 3.5642 12.128 3.73812C12.3189 3.80175 12.4716 3.95445 12.5352 4.14534C12.7134 4.69677 12.531 5.48151 12.1238 5.88873L10.8258 7.18673C10.7494 7.26309 10.7197 7.41155 10.7537 7.51335L11.0082 8.14115L6.41003 8.14115V8.14115Z"
                  fill="#23B9E9"
                />
                <path
                  d="M11.8814 12.1976L11.3215 12.7575C10.9609 13.118 10.5113 13.0247 10.3204 12.5454L9.11149 9.50399C9.00968 9.26644 8.79335 9.21978 8.61095 9.40218L7.37658 10.6366C7.27902 10.7341 7.19418 10.9292 7.19842 11.0692L7.19418 13.0417C7.19418 13.2453 7.03723 13.4956 6.85059 13.5889L6.08282 13.9749C5.74771 14.1403 5.34898 13.9706 5.23021 13.6228L5.06902 11.7649C5.04781 11.4807 4.79754 11.2304 4.51334 11.2092L2.65541 11.048C2.30334 10.9335 2.13791 10.5305 2.31182 10.2039L2.69783 9.43612C2.79539 9.24523 3.04142 9.09253 3.24503 9.09253L5.21748 9.08829C5.35322 9.08829 5.54835 9.00345 5.64591 8.90589L6.40944 8.14236L11.0076 8.14236L12.1359 10.9759C12.2886 11.3577 12.1699 11.9091 11.8814 12.1976V12.1976Z"
                  fill="#23B9E9"
                />
              </svg>
            </Box>
          </Box>
        </Box>
        <Box w="full" display="flex" justifyContent="space-between" pb="20px">
          <Box
            display="flex"
            fontSize="12px"
            color="#333333"
            justifyContent="center"
            alignItems="center"
          >
            <Text noOfLines={1} w="100px" textOverflow="ellipsis">
              {quote.origin_port}
            </Text>
            <Text
              width="20px"
              textAlign="center"
              height="20px"
              borderRadius="5px"
              ml="5px"
              border="1px solid #666666"
            >
              {quote.door_pickup ? "D" : "P"}
            </Text>
          </Box>
          <Box
            w="full"
            display="flex"
            fontSize="12px"
            color="#333333"
            justifyContent="space-evenly"
            justifyItems="center"
            alignItems="center"
          >
            <svg
              width="18"
              height="2"
              viewBox="0 0 18 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="0.75" cy="0.75" r="0.75" fill="#666666" />
              <circle cx="4.75" cy="0.75" r="0.75" fill="#666666" />
              <circle cx="8.75" cy="0.75" r="0.75" fill="#666666" />
              <circle cx="12.75" cy="0.75" r="0.75" fill="#666666" />
              <circle cx="16.75" cy="0.75" r="0.75" fill="#666666" />
            </svg>
            <Box display="flex">
              <Text noOfLines={1} w="70px" textOverflow="ellipsis">
                {quote.destination_port}
              </Text>
              <Text
                width="20px"
                textAlign="center"
                height="20px"
                borderRadius="5px"
                ml="5px"
                border="1px solid #666666"
              >
                {quote.door_delivery ? "D" : "P"}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        w="full"
        h="40px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => {
          router.push({
            pathname: "/summary",
            query: { bid: quote.id },
          });
        }}
      >
        {/* <ActionDecider action={quote.booking_status} /> */}
        <Text cursor={'pointer'} color='#83b9f2'>Continue</Text>
      </Box>
    </Box>
  );
};
const Quotes = ({ data }: { data: GetQuotes[] }) => {
  return (
    <Box
      w="full"
      height={"calc(100vh - 80px)"}
      display="flex"
      justifyContent="center"
    >
      <SimpleGrid
        pt="50px"
        pb="100px"
        columns={3}
        spacingX="100px"
        spacingY="40px"
      >
        {data?.map((quote) => {
          return (
            <Box key={quote.id}>
              <QuoteItem quote={quote} />
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
export default Quotes;
export async function getServerSideProps() {
  // const router = useRouter();
  const user_id = Cookies.get("userId");
  // if (user_id == undefined) {
  //   router.push("/");
  // }
  const endpoint = `http://localhost:9090/v1/account/${user_id}/bookings`;

  const response = await axios.get(endpoint);
  const data: GetQuotes[] = await response.data?.message;
  console.log(data);
  return {
    props: { data: data },
  };
}
