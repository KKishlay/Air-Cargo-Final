import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Customer from "../../components/RequestQuote/Customer";
import Destination from "../../components/RequestQuote/Destination";
import Origin from "../../components/RequestQuote/Origin";
import Product from "../../components/RequestQuote/Product";
import { QuotesForm } from "../../src/types/Types";

const AddQuote = () => {
  const router = useRouter();
  const QuoteStep = ["Customer", "Origin", "Destination", "Product"];
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [submissionMessage, setSubmissionMessage] = useState<boolean>();
  const handleNext = async () => {
    let isInvalid = false;
    switch (currentStep) {
      case 0:
        isInvalid = await trigger([
          "customer_name",
          "term_of_shipment",
          "ready_date",
        ]);
        break;
      case 1:
        isInvalid = await trigger(["origin"]);
        break;
      case 2:
        isInvalid = await trigger(["destination"]);
        break;
      case 3:
        isInvalid = await trigger([
          "dangerous",
          "stackable",
          "products.items",
          "hs_code",
        ]);
    }
    if (isInvalid && currentStep == 3) {
      if (watch()?.products === undefined) {
        console.log("dont send data");
      } else {
        const data = watch();
        data?.products?.items.forEach((item) => {
          item.count = parseFloat(item.count?.toString() || "0");
          item.height = parseFloat(item.height?.toString() || "0");
          item.weight = parseFloat(item.weight?.toString() || "0");
          item.width = parseFloat(item.width?.toString() || "0");
          item.length = parseFloat(item.length?.toString() || "0");
        });
        if (!data.origin.pickup) {
          data.origin.address = null;
        }
        if (!data.destination.pickup) {
          data.destination.address = null;
        }
        const payload = {
          booked_on: Date.now().toString(),
          customer_id: Cookies.get("userId") || "default",
          terms_of_shipment: data.term_of_shipment,
          origin_port: data.origin.port,
          origin_address: data.origin?.address,
          destination_port: data.destination.port,
          destination_address: data.destination.address,
          door_pickup: data.origin.pickup,
          door_delivery: data.destination.pickup,
          origin_customs: data.origin.custom,
          destination_customs: data.destination.custom,
          cargo_ready_date: data.ready_date,
          cargo_is_dangerous: data.dangerous,
          cargo_is_stackable: data.stackable,
          cargo_dimension_unit: data.products.dimension,
          cargo_count: data.products.items[0].count,
          cargo_weight: data.products.items[0].weight,
          cargo_length: data.products.items[0].length,
          cargo_height: data.products.items[0].height,
          cargo_width: data.products.items[0].width,
          cargo_hs_code: parseInt(data.hs_code),
          remarks: "",
          booking_status: "Booking Created",
        };
        axios
          .post("http://localhost:9090/v1/account/1/booking", payload)
          .then(function (response) {
            console.log(response);
            setSubmissionMessage(true);
            setCurrentStep(currentStep + 1);
          })
          .catch(function (error) {
            console.log(error);
            setSubmissionMessage(false);
            setCurrentStep(currentStep + 1);
          });
      }
    } else if (isInvalid) {
      setCurrentStep(currentStep + 1);
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm<QuotesForm>({
    mode: "all",
  });
  return (
    <Box
      h={"calc(100vh - 70px)"}
      w="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        position="relative"
        p=" 70px"
        px="20%"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Divider variant={"dashed"} borderColor="black" />
        <Box
          display="flex"
          position="absolute"
          mt="15px"
          w="full"
          alignItems="center"
          justifyContent="space-evenly"
        >
          {QuoteStep.map((label, index) => {
            return (
              <Box
                key={index}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  display="flex"
                  w="70px"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    w="full"
                    h="70px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    border="1px solid #DDDDDD"
                    backgroundColor={
                      currentStep > index ? "green.500" : "white"
                    }
                    borderRadius="50%"
                  >
                    {index < currentStep ? (
                      <CheckIcon fill="white" height="30px" />
                    ) : (
                      <Text>{index + 1}</Text>
                    )}
                  </Box>
                  <Text fontSize="14px">{label}</Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        w="full"
        h="full"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box>
          {currentStep === 0 ? (
            <Customer errors={errors} register={register} />
          ) : null}
          {currentStep === 1 ? (
            <Origin errors={errors} register={register} watch={watch} />
          ) : null}
          {currentStep === 2 ? (
            <Destination errors={errors} watch={watch} register={register} />
          ) : null}
          {currentStep === 3 ? (
            <Product
              control={control}
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
            />
          ) : null}
          {currentStep >= 4 ? (
            <Box
              w="full"
              height="full"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text>
                {submissionMessage
                  ? "Successfully Submitted"
                  : "Sorry ! There was an Error while Submitting "}
              </Text>
              {submissionMessage ? (
                <Box
                  as="button"
                  border="1px solid white"
                  color="white"
                  bg="blue.500"
                  p="20px"
                  mt="20px"
                  onClick={() => {
                    router.push("/quote");
                  }}
                >
                  {" "}
                  Go to Quotes Page
                </Box>
              ) : null}
            </Box>
          ) : null}
        </Box>
        {currentStep < QuoteStep.length ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="50px"
            w="full"
            pt="20px"
            px="30%"
            mb="70px"
          >
            <Button
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
              w="100px"
            >
              Previous
            </Button>
            <Button
              w="100px"
              disabled={currentStep === QuoteStep.length}
              onClick={handleNext}
            >
              {currentStep === 3 ? "Submit" : "Next"}
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
export default AddQuote;
