import { Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("userId")) {
      router.push("/quote");
    } else {
      router.push("/login");
    }
  }, []);
  return <Box></Box>;
};

export default Home;
