import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const reports = () => {
  return (
    <>
      <Box ml={"110px"} mt="60px">
        <Box fontSize={"20px"} mt="110px" fontWeight={600}>
          <Text>Reports</Text>
        </Box>
        <Box
          mt={"30px"}
          border-borderRadius={"4px"}
          boxShadow=" 0px 3px 5px 5px rgba(0, 0, 0, 0.25)"
          w="1200px"
          p={"20px"}
          h={"100px"}
          display={"flex"}
          justifyContent="space-evenly"
        >
          <VStack>
            <Text fontWeight={600}>Reports</Text>
            <Text>Air Cargo Database</Text>
          </VStack>
          <VStack>
            <Text fontWeight={600}>Description</Text>
            <Text>A report consisting of all the Ports.</Text>
          </VStack>
          <VStack>
            <Text fontWeight={600}>Created on</Text>
            <Text>26 Nov 2022</Text>
          </VStack>
          <VStack>
            <Text fontWeight={600}>Created By</Text>
            <Text>Aman Gupta</Text>
          </VStack>
        </Box>
      </Box>
    </>
  );
};
export default reports;
