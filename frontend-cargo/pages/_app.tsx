import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins'`,
    body: `'Poppins'`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("userId")) {
      router.push("/login");
    }
  }, [router]);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
