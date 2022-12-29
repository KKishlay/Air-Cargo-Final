import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Text,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import axios from "axios";
  import Cookies from "js-cookie";
  import router from "next/router";
  type InputField = {
    name: string;
    email: string;
    password: string;
  };
  const Login = () => {
    const schema = yup.object().shape({
      email: yup.string().email().required("Email Required"),
      password: yup.string().min(7).max(15).required("Password Required"),
    });
    const [ErrorMessage, setErrorMessage] = useState<boolean>(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<InputField>({
      resolver: yupResolver(schema),
      mode: "all",
    });
  
    const submitForm = (data: InputField) => {
      axios
        .post("http://localhost:9090/v1/login", data)
        .then(function (response) {
          Cookies.set("userId", response?.data?.message?.id);
          Cookies.set("role", response?.data?.message?.account_type);
          setErrorMessage(false);
          router.push("/booking");
        })
        .catch(function (error) {
          setErrorMessage(true);
          console.log("error message", error);
        });
    };
  
    return (
      <Box h="100vh" w="100vw" display="flex">
        <Box
          w="50%"
          pl="50px"
          h={"100%"}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src="cargo.png" width="70%" height="full" />
        </Box>
        <Box
          h="full"
          w="50%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Text fontSize="20px" textAlign="center">
            Enter Your Credential
          </Text>
          <Box
            mt="50px"
            w="full"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <form onSubmit={handleSubmit(submitForm)}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box w="400px" pb="20px">
                  <FormControl isInvalid={Boolean(errors?.email)}>
                    <Input
                      fontSize="12px"
                      placeholder="Enter Your Email"
                      {...register("email")}
                    />
                    <FormErrorMessage fontSize="12px">
                      {errors?.email?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box w="400px" pb="20px">
                  <FormControl isInvalid={Boolean(errors?.password)}>
                    <Input
                      fontSize="12px"
                      type="password"
                      placeholder="Enter Your Password"
                      {...register("password")}
                    />
                    <FormErrorMessage fontSize="12px">
                      {errors?.password?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                {ErrorMessage ? (
                  <Text fontSize="12px" color="red">
                    Invalid username or password
                  </Text>
                ) : null}
                <Button
                  mt="20px"
                  bgColor="purple.500"
                  color="white"
                  w="200px"
                  type="submit"
                >
                  Login
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default Login;
  