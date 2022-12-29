import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  useOutsideClick,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import {
  useFieldArray,
  useForm,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { QuotesForm } from "../src/types/Types";
import Toggle from "./Toggle";
type ContainerProps = {
  setValue: UseFormSetValue<QuotesForm>;
  defaultValue: QuotesForm["products"]["items"];
};
const Container = (props: ContainerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setValue, defaultValue } = props;
  const [productCount, setProductCount] = useState<number>(
    defaultValue?.length || 0
  );
  const { control, register, watch, handleSubmit } = useForm<
    QuotesForm["products"]
  >({
    mode: "all",
    defaultValues: {
      items: defaultValue || [
        {
          count: undefined,
          weight: undefined,
          length: undefined,
          width: undefined,
          height: undefined,
        },
      ],
      dimension: "cm",
    },
  });
  const calculate = watch();
  function submit(data: any) {
    setProductCount(data?.items?.length);
    setIsOpen(false);
    setValue("products", data);
    console.log("submit", data);
  }
  const { fields, remove, append } = useFieldArray<QuotesForm["products"]>({
    control,
    name: "items",
  });
  const ref = useRef<HTMLHeadingElement>(null);
  useOutsideClick({
    ref: ref,
    handler: () => {
      setIsOpen(false);
    },
  });
  return (
    <Box w="full" display="flex" ref={ref}>
      <Box
        px="10px"
        py="10px"
        pl="20px"
        w="full"
        border="1px solid #DDDDDD"
        borderRadius="5px"
        borderBottomRadius={isOpen ? "none" : "5px"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Text w="full" fontSize="14px" textAlign="start" as="button">
          {`${
            productCount > 0
              ? productCount > 1
                ? `${productCount} Products`
                : `1 Product`
              : `Products`
          }`}
        </Text>
        <Box>
          {!isOpen ? (
            <ChevronRightIcon width="20px" height="15px" />
          ) : (
            <ChevronLeftIcon width="20px" height="15px" />
          )}
        </Box>
      </Box>
      {isOpen ? (
        <Box
          w="300px"
          bg="white"
          h="420px"
          overflow="scroll"
          ml="300px"
          mt="-200px"
          pos="absolute"
          boxShadow="xl"
          py="20px"
          zIndex={30}
        >
          <form onSubmit={handleSubmit(submit)}>
            <Box fontSize="10px" px="20px">
              <Text>Dimensions in</Text>
              <HStack fontSize="12px" spacing="10px" mt="10px">
                <Toggle
                  control={control}
                  name="dimension"
                  options={[
                    { value: "cm", label: "cm" },
                    { value: "m", label: "m" },
                    { value: "in", label: "in" },
                  ]}
                  defaultValue="cm"
                  width="10px"
                  fontSize="12px"
                />
              </HStack>
              {fields.map(({ id }, index) => {
                return (
                  <VStack key={id} mt="20px" spacing="15px" alignItems="start">
                    <Box display="flex" w="full" justifyContent="space-between">
                      <Text>{`Product ${index + 1}`}</Text>
                      {fields.length > 1 ? (
                        <Text
                          as="button"
                          color="red"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          Remove
                        </Text>
                      ) : null}
                    </Box>
                    <Box display="flex" w="full" alignItems="center">
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text>Count</Text>
                        <Input
                          mt="5px"
                          type="number"
                          w="50px"
                          p={0}
                          pl="10px"
                          fontSize="12px"
                          {...register(`items.${index}.count`, {
                            required: true,
                          })}
                        ></Input>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        ml="50px"
                      >
                        <Text>{`Weight/p(kg)`}</Text>
                        <Input
                          mt="5px"
                          type="number"
                          w="50px"
                          p={0}
                          pl="10px"
                          fontSize="12px"
                          {...register(`items.${index}.weight`, {
                            required: true,
                          })}
                        />
                      </Box>
                    </Box>
                    <Box display="flex" w="full" alignItems="center">
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text>{`Length(${calculate.dimension})`}</Text>
                        <Input
                          mt="5px"
                          type="number"
                          w="50px"
                          p={0}
                          pl="10px"
                          fontSize="12px"
                          {...register(`items.${index}.length`, {
                            required: true,
                          })}
                        />
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        ml="30px"
                      >
                        <Text>{`Width(${calculate.dimension})`}</Text>
                        <Input
                          mt="5px"
                          type="number"
                          w="50px"
                          p={0}
                          pl="10px"
                          fontSize="12px"
                          {...register(`items.${index}.width`, {
                            required: true,
                          })}
                        />
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        ml="30px"
                      >
                        <Text>{`Height(${calculate.dimension})`}</Text>
                        <Input
                          mt="5px"
                          type="number"
                          w="50px"
                          p={0}
                          pl="10px"
                          fontSize="12px"
                          {...register(`items.${index}.height`, {
                            required: true,
                          })}
                        />
                      </Box>
                    </Box>
                    <Box display="flex" w="full" justifyContent="space-between">
                      <Box>
                        <Text>
                          {`Volume: ${
                            (calculate.items[index].count || 0) *
                            (calculate.items[index].length || 0) *
                            (calculate.items[index].width || 0) *
                            (calculate.items[index].height || 0)
                          } ${calculate.dimension}`}
                          <sup>3</sup>
                        </Text>
                      </Box>
                      <Box>
                        <Text>{`Weight: ${
                          (calculate.items[index].count || 0) *
                          (calculate.items[index].weight || 0)
                        } kg`}</Text>
                      </Box>
                    </Box>
                  </VStack>
                );
              })}
              <Box>
                <Box
                  display="flex"
                  w="full"
                  justifyContent="space-between"
                  mt="20px"
                >
                  <Text>
                    {" "}
                    {`Total Volume ${calculate.items.reduce(
                      (accumulator, object) => {
                        return (
                          accumulator +
                          (object.count || 0) *
                            (object.length || 0) *
                            (object.width || 0) *
                            (object.height || 0)
                        );
                      },
                      0
                    )} ${calculate.dimension}`}
                    <sup>3</sup>
                  </Text>
                  <Text>
                    {`Total weight ${calculate.items.reduce(
                      (accumulator, object) => {
                        return (
                          accumulator +
                          (object.count || 0) * (object.weight || 0)
                        );
                      },
                      0
                    )} kg`}
                  </Text>
                </Box>
                <Box
                  display="flex"
                  w="full"
                  justifyContent="space-between"
                  mt="20px"
                >
                  <Button
                    p="2"
                    boxShadow="md"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w="100px"
                    borderRadius={"5px"}
                    backgroundColor={"blue.100"}
                    fontSize="12px"
                    type="submit"
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      ) : null}
    </Box>
  );
};
export default Container;
