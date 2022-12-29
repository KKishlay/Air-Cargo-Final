import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import router from "next/router";
import Cookies from "js-cookie";

const Navbar = () => {
  const logout = () => {
    Cookies.remove("userId");
    Cookies.remove("role");
    router.push("/");
  };

  return (
    <>
      <Box w={"full"} h="80px" bg={"#c6d0f5"}>
        <Box display={"flex"} justifyContent="space-between">
          <Box ml={"40px"} mt="30px">
            {/*
             */}
            <Text
              fontSize={"20px"}
              _hover={{ color: "white", transform: "scale(1.3)" }}
              transition="1s"
              fontWeight="600"
            >
              Air <sup> Cargo</sup>
            </Text>
          </Box>

          <Box display={"flex"} mt="30px">
            <Link href={"/booking"}>
              <Text
                _hover={{ color: "white", transform: "scale(1.3)" }}
                transition="1s"
                fontWeight={500}
                cursor="pointer"
              >
                Bookings
              </Text>
            </Link>
            <Link href={"/quote"}>
              <Text
                _hover={{ color: "white", transform: "scale(1.3)" }}
                transition="1s"
                fontWeight={500}
                ml="50px"
                cursor="pointer"
              >
                Quotes
              </Text>
            </Link>
           
            <Link href={"/quote/add"}>
              <Text
                _hover={{ color: "white", transform: "scale(1.3)" }}
                transition="1s"
                fontWeight={500}
                ml="50px"
                cursor="pointer"
              >
                Request a Quote
              </Text>
            </Link>
            <Link href={"/reports"}>
              <Text
                _hover={{ color: "white", transform: "scale(1.3)" }}
                transition="1s"
                fontWeight={500}
                ml="50px"
                cursor="pointer"
              >
                Reports
              </Text>
            </Link>

            {Cookies.get("userId") ? (
              <Text
                as={"button"}
                _hover={{ color: "white", transform: "scale(1.3)" }}
                transition="1s"
                fontWeight={500}
                onClick={logout}
                mx="50px"
                border={"1px solid black"}
                p="6px"
                bg="#b4cffa"
              >
                Log Out
              </Text>
            ) : (
              <Text
                as={"button"}
                _hover={{ color: "white", transform: "scale(1.3)" }}
                transition="1s"
                fontWeight={500}
                onClick={() => {
                  router.push("/login");
                }}
                mx="50px"
                border={"1px solid black"}
                p="6px"
                bg="#b4cffa"
              >
                Log In
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Navbar;
