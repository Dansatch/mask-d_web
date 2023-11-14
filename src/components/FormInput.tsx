import { HTMLInputTypeAttribute, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import colors from "../config/colors";

interface Props {
  label?: String;
  type: HTMLInputTypeAttribute | undefined;
  isRequired?: Boolean;
  errorMessage?: String;
  register: UseFormRegisterReturn;
  placeholder?: string;
  labelStyles?: React.CSSProperties;
  styles?: React.CSSProperties;
  hideFocusBorder?: boolean;
  asTextArea?: boolean;
  minLength?: number;
  maxLength?: number;
  centerLabel?: boolean;
  readOnly?: boolean;
}

const FormInput = ({
  label,
  type,
  minLength,
  maxLength,
  isRequired,
  errorMessage,
  register,
  labelStyles,
  styles,
  hideFocusBorder,
  asTextArea,
  centerLabel,
  readOnly,
  placeholder = "",
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isRequired={Boolean(isRequired)}>
      {label && (
        <FormLabel
          textAlign={centerLabel ? "center" : "left"}
          style={labelStyles}
        >
          {label}
        </FormLabel>
      )}

      {type === "password" ? (
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            {...register}
            placeholder={placeholder}
            borderColor={errorMessage ? colors.danger : ""}
            focusBorderColor={hideFocusBorder ? "transparent" : ""}
            style={styles}
            readOnly={readOnly}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input
          as={asTextArea ? "textarea" : "input"}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
          {...register}
          placeholder={placeholder}
          borderColor={errorMessage ? colors.danger : ""}
          focusBorderColor={hideFocusBorder ? "transparent" : ""}
          resize={"none"}
          style={styles}
          readOnly={readOnly}
        />
      )}

      <Text color={colors.danger} textAlign="left" marginLeft={2} marginTop={1}>
        {errorMessage}
      </Text>
    </FormControl>
  );
};

export default FormInput;
