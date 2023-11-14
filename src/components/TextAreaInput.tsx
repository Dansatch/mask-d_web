import React, { HTMLInputTypeAttribute } from "react";
import { FormControl, FormLabel, Text, Textarea } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import colors from "../config/colors";

interface Props {
  label?: string;
  type: HTMLInputTypeAttribute | undefined;
  isRequired?: boolean;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  labelStyles?: React.CSSProperties;
  styles?: React.CSSProperties;
  hideFocusBorder?: boolean;
  focusBorderColor?: string;
  maxLength?: number;
}

const TextAreaInput = ({
  label,
  isRequired,
  errorMessage,
  register,
  maxLength,
  labelStyles,
  styles,
  hideFocusBorder,
  focusBorderColor = "",
  placeholder = "",
}: Props) => {
  return (
    <FormControl isRequired={Boolean(isRequired)}>
      {label && <FormLabel style={labelStyles}>{label}</FormLabel>}
      <Textarea
        placeholder={placeholder}
        {...register}
        borderColor={errorMessage ? colors.danger : ""}
        maxLength={maxLength}
        focusBorderColor={hideFocusBorder ? "transparent" : focusBorderColor}
        _focus={{
          borderWidth: "0px",
        }}
        style={styles}
      />

      <Text color={colors.danger} textAlign="left" marginLeft={2} marginTop={1}>
        {errorMessage}
      </Text>
    </FormControl>
  );
};

export default TextAreaInput;
