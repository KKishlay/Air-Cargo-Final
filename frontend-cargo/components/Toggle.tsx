import { Box, Button, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import React, { forwardRef, ReactNode, Ref } from "react";
import { Control, useController } from "react-hook-form";
import { string } from "yup";

type CustomRadioProps = {
  children?: ReactNode;
};
const CustomRadio = forwardRef<HTMLButtonElement, CustomRadioProps>(
  ({ children, ...props }, ref) => {
    const { state, getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps({ ref });
    const checkbox = getCheckboxProps();

    return (
      <Box as="label">
        <input {...input} />
        <Button
          as="div"
          border="1px solid #dddddd"
          borderRadius="5px"
          {...checkbox}
          cursor="pointer"
          backgroundColor={state.isChecked ? "blue.100" : "white"}
        >
          {children}
        </Button>
      </Box>
    );
  }
);
type ToggleProps = {
  name: string;
  defaultValue?: string | number;
  options: {
    label: string | number;
    value: string | number;
  }[];
  control: any;
  width?: string;
  fontSize?: string;
};
const Toggle = forwardRef<HTMLDivElement, ToggleProps>(
  ({ control, name, defaultValue, options, ...rest }, ref) => {
    const { field } = useController({
      name,
      control,
      rules: { required: "Toggle is required" },
      defaultValue,
    });

    const { getRootProps, getRadioProps } = useRadioGroup({
      ...field,
    });
    return (
      <HStack ref={ref} {...getRootProps()} spacing="20px">
        {options.map((item, index) => {
          return (
            <CustomRadio key={index} {...getRadioProps({ value: item.value })}>
              <Box
                fontSize="14px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                {...rest}
              >
                {item.label}
              </Box>
            </CustomRadio>
          );
        })}
      </HStack>
    );
  }
);

export default Toggle;
