import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute, useState } from "react";
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
  styles?: React.CSSProperties;
  hideFocusBorder?: boolean;
  asTextArea?: boolean;
  min?: string;
  centerLabel?: boolean;
}

const FormInput = ({
  label,
  type,
  min,
  isRequired,
  errorMessage,
  register,
  styles,
  hideFocusBorder,
  asTextArea,
  centerLabel,
  placeholder = "",
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isRequired={Boolean(isRequired)}>
      {label && (
        <FormLabel textAlign={centerLabel ? "center" : "left"}>
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
          min={min}
          {...register}
          placeholder={placeholder}
          borderColor={errorMessage ? colors.danger : ""}
          focusBorderColor={hideFocusBorder ? "transparent" : ""}
          resize={"none"}
          style={styles}
        />
      )}

      <Text color={colors.danger} textAlign="left" marginLeft={2} marginTop={1}>
        {errorMessage}
      </Text>
    </FormControl>
  );
};

export default FormInput;
